import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Si estás usando HttpClient
import { ApiServiceDbjsonService } from './api-service-dbjson.service';

describe('ApiServiceDbjsonService', () => {
  let service: ApiServiceDbjsonService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Importa si el servicio usa HttpClient
      providers: [ApiServiceDbjsonService]
    });
    service = TestBed.inject(ApiServiceDbjsonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
