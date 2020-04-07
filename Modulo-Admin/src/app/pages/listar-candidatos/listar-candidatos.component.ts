import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource, MatTable } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { CandidatosService } from "src/app/services/candidatos.service";
import { rowsAnimation } from "src/app/material/table.animation";
import Swal from "sweetalert2";
import { AlertasService } from "src/app/services/alertas.service";
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: "app-listar-candidatos",
  templateUrl: "./listar-candidatos.component.html",
  styleUrls: ["./listar-candidatos.component.scss"],
  animations: [rowsAnimation]
})
export class ListarCandidatosComponent implements OnInit {
  columns = [
    {
      columnDef: "Foto",
      header: "Foto",
      cell: (row: any) => `${row.Foto}`
    },
    {
      columnDef: "NombreC",
      header: "Nombre",
      cell: (row: any) => `${row.NombreC}`
    },
    {
      columnDef: "Jornada",
      header: "Jornada",
      cell: (row: any) => `${row.Jornada}`
    },
    {
      columnDef: "Targeton",
      header: "Tarjeton",
      cell: (row: any) => `${row.Targeton}`
    },
    {
      columnDef: "Acciones",
      header: "Acciones",
      cell: (row: any) => `${row._id}`
    }
  ];

  displayedColumns: string[] = ['Foto', 'NombreC', 'Jornada', 'Targeton', 'Acciones'];
  dataSource: MatTableDataSource<any[]>;
  carga: boolean = true;
  noData: boolean = false;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;

  constructor(
    private CandidatosService: CandidatosService,
    private alertas: AlertasService,
    public api: ApiService
  ) {
    this.CandidatosService.ObtenerCandidatos().subscribe((data: {}) => {
      //@ts-ignore
      this.dataSource.data = data;
      if (data) {
        //@ts-ignore
        if (data.length == 0) {
          this.noData = true;
        }
        this.carga = false;
      }
    });
  }
  ngOnInit() {
    this.dataSource = new MatTableDataSource();
    this.dataSource.paginator = this.paginator;
  }

  acciones(accion: string, element) {
    if (accion == "2") {
      Swal.fire({
        title: "¿Estás seguro?",
        text: "No podras revertir está acción",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#00e676",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar"
      }).then(result => {
        if (result.value) {
          this.CandidatosService.EliminarCandidato(element._id).subscribe(
            res => {
              if (res) {
                this.dataSource.data = this.dataSource.data.filter(
                  (value, key) => {
                    //@ts-ignore
                    return value._id != element._id;
                  }
                );
                this.alertas.Alerta(res);
              }
            }
          );
        }
      });
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
