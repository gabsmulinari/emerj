import { IsNumber, IsString } from 'class-validator';

export class EditCursosDTO {
  @IsNumber()
  cursosId?: number;

  @IsString()
  nome?: string;

  @IsString()
  descricao?: string;

  @IsString()
  tipo?: string;
}
