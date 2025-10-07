<script setup lang="ts">
import { ref } from 'vue';

interface Servicio {
  id: string;
  titulo: string;
  icono: string;
  color: string;
  descripcion: string;
}

const serviciosDestacados = ref<Servicio[]>([
  {
    id: 'claves',
    titulo: 'Claves',
    icono: 'pi pi-key',
    color: '#2f836e',
    descripcion: 'Gestión de claves de acceso'
  },
  {
    id: 'ruc',
    titulo: 'RUC',
    icono: 'pi pi-building',
    color: '#4077ba',
    descripcion: 'Registro Único de Contribuyentes'
  },
  {
    id: 'facturacion',
    titulo: 'Facturación física',
    icono: 'pi pi-file',
    color: '#d73747',
    descripcion: 'Autorización de comprobantes físicos'
  },
  {
    id: 'electronica',
    titulo: 'Facturación electrónica',
    icono: 'pi pi-desktop',
    color: '#597f2e',
    descripcion: 'Comprobantes electrónicos'
  },
  {
    id: 'declaraciones',
    titulo: 'Declaraciones',
    icono: 'pi pi-file-edit',
    color: '#4077ba',
    descripcion: 'Declaraciones de impuestos'
  }
]);

const serviciosAdicionales = ref([
  {
    id: 'consulta',
    titulo: 'Consulta',
    icono: 'pi pi-search',
    descripcion: 'Consulta de información tributaria'
  },
  {
    id: 'valores',
    titulo: 'Valores a pagar por placa, RAMV, CPN o chasis',
    icono: 'pi pi-car',
    descripcion: 'Consulta de valores vehiculares'
  },
  {
    id: 'deudas',
    titulo: 'Consulta deudas firmes, impugnadas y en facilidades de pago',
    icono: 'pi pi-dollar',
    descripcion: 'Estado de deudas tributarias'
  },
  {
    id: 'impuesto',
    titulo: 'Consulta de Impuesto a la Renta Causado, ISD y otros regímenes',
    icono: 'pi pi-chart-bar',
    descripcion: 'Información de impuestos'
  },
  {
    id: 'facturador',
    titulo: 'Facturador SRI',
    icono: 'pi pi-file-pdf',
    descripcion: 'Sistema de facturación en línea'
  }
]);
</script>

<template>
  <div class="inicio-vista">
    <!-- Sección de Servicios Destacados (Carrusel Circular) -->
    <div class="seccion-servicios-destacados">
      <div class="carrusel-servicios">
        <div class="contenedor-fluido">
          <div class="fila alinear-centro">
            <!-- Botón Anterior -->
            <div class="columna-auto">
              <button class="carrusel-btn" aria-label="Anterior">
                <i class="pi pi-chevron-left"></i>
              </button>
            </div>

            <!-- Grid de Servicios -->
            <div class="columna">
              <div class="servicios-grid">
                <div class="fila justificar-centro">
                  <div v-for="servicio in serviciosDestacados" :key="servicio.id" class="columna-auto">
                    <div class="servicio-card" :style="{ borderColor: servicio.color }">
                      <div class="servicio-icono" :style="{ backgroundColor: servicio.color }">
                        <i :class="servicio.icono"></i>
                      </div>
                      <h3 class="servicio-titulo">{{ servicio.titulo }}</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Botón Siguiente -->
            <div class="columna-auto">
              <button class="carrusel-btn" aria-label="Siguiente">
                <i class="pi pi-chevron-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Sección de Tabs -->
    <div class="seccion-tabs">
      <div class="tabs-header">
        <div class="fila">
          <div class="columna-auto">
            <button class="tab-btn active">Servicios más utilizados</button>
          </div>
          <div class="columna-auto">
            <button class="tab-btn">Más servicios</button>
          </div>
        </div>
      </div>

      <div class="tabs-content">
        <div class="servicios-lista">
          <div class="fila">
            <div v-for="servicio in serviciosAdicionales" :key="servicio.id"
              class="columna-12 columna-md-6 columna-lg-4">
              <div class="servicio-item">
                <div class="mostrar-flex">
                  <div class="servicio-item-icono">
                    <i :class="servicio.icono"></i>
                  </div>
                  <div class="servicio-item-info">
                    <h4>{{ servicio.titulo }}</h4>
                    <p>{{ servicio.descripcion }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
