import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource, MatTable } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { PersonasService } from "src/app/services/personas.service";
import { rowsAnimation } from "src/app/material/table.animation";
import Swal from "sweetalert2";
import { AlertasService, mensaje } from 'src/app/services/alertas.service';

@Component({
  selector: "app-listar-personas",
  templateUrl: "./listar-personas.component.html",
  styleUrls: ["./listar-personas.component.scss"],
  animations: [rowsAnimation]
})
export class ListarPersonasComponent implements OnInit {
  columns = [
    {
      columnDef: "Documento",
      header: "Documento",
      cell: (row: any) => `${row.Documento}`
    },
    {
      columnDef: "Nombres",
      header: "Nombres",
      cell: (row: any) => `${row.Nombres}`
    },
    {
      columnDef: "P_Apellido",
      header: "Primer Apellido",
      cell: (row: any) => `${row.P_Apellido}`
    },
    {
      columnDef: "S_Apellido",
      header: "Segundo Apellido",
      cell: (row: any) => `${row.S_Apellido}`
    },
    {
      columnDef: "Acciones",
      header: "Acciones",
      cell: (row: any) => `${row._id}`
    }
  ];

  displayedColumns = this.columns.map(x => x.columnDef);
  dataSource: MatTableDataSource<any[]>;
  carga: boolean = true;
  noData: boolean = false;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;

  constructor(
    private PersonasService: PersonasService,
    private alertas: AlertasService  
  ) {
    this.PersonasService.ObtenerPersonas().subscribe((data: {}) => {
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
          this.PersonasService.EliminarPersona(element._id).subscribe(
            res => {
              if(res){
                this.dataSource.data = this.dataSource.data.filter(
                  (value, key) => {
                    //@ts-ignore
                    return value._id != element._id;
                  }
                );
                this.alertas.Alerta(res)
              }
            },
            err => console.log(err)
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
