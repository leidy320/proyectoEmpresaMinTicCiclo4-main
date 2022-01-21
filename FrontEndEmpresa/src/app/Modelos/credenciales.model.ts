import { DatosModel } from "./datos.model";

export class CredencialesModel{
    data?: DatosModel;
    tk?: string;
    identificado: boolean = false;
    rol: string = "";
}