import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'http://localhost:3000'; // La URL de tu json-server

  constructor(private http: HttpClient) { }

  // Obtener todos los usuarios
  getUsuarios(): Observable<any> {
    return this.http.get(`${this.baseUrl}/usuarios`);
  }

  // Obtener un usuario por id
  getUsuario(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/usuarios/${id}`);
  }
  //Obtener usuario por nombre
  getUsuarioByNombre(nombre: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/usuarios?nombre=${nombre}`);
  }

  // Crear un nuevo usuario
  crearUsuario(usuario: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/usuarios`, usuario);
  }

  // Actualizar un usuario
  actualizarUsuario(id: number, usuario: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/usuarios/${id}`, usuario);
  }

  // Eliminar un usuario
  eliminarUsuario(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/usuarios/${id}`);
  }
}
