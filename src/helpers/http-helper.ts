import { HttpResponse } from '../shared/interfaces';

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  data: error.message,
});

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  data,
});

export const serverError = (reason: string): HttpResponse => ({
  statusCode: 500,
  data: 'Erro: ' + reason,
});
