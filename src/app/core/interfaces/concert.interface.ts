export interface Concert {
  id: string;
  nombre: string;
  imagen: string;
  fecha: string;
  recinto: string;
  comuna: string;
  precio: {
    moneda: string;
    monto: number;
  };
  artistas: string[];
  agotado: boolean;
}
