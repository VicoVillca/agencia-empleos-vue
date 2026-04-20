<template>
  <div class="row justify-content-center py-5">
    <div class="col-md-9 col-lg-8">
      <div class="mb-4">
        <button class="btn btn-light shadow-sm rounded-pill px-4 text-secondary fw-semibold" @click="$router.push('/trabajos')">← Volver a empleos</button>
      </div>

      <div v-if="loading" class="text-center text-muted my-5">
        <div class="spinner-border text-primary" role="status"></div>
        <p class="mt-2">Cargando detalles del empleo...</p>
      </div>
      <div v-else-if="error" class="alert alert-danger shadow-sm">{{ error }}</div>
      <div v-else-if="trabajo" class="card shadow-lg border-0 rounded-4 overflow-hidden">
        <div class="card-header bg-white p-5 d-flex justify-content-between align-items-center border-0">
          <h2 class="mb-0 fw-bold text-dark display-6">{{ trabajo.titulo }}</h2>
          <span class="badge bg-primary bg-opacity-10 text-primary fs-6 px-3 py-2 rounded-pill" v-if="trabajo.categoria">{{ trabajo.categoria.nombre }}</span>
        </div>
        
        <div class="card-body bg-light border-bottom border-top p-5">
          <div class="row g-4">
            <div class="col-md-4">
              <p class="mb-1 text-muted fw-semibold">Empresa</p>
              <p class="fw-bold fs-5 text-dark mb-0">{{ trabajo.empresa }}</p>
            </div>
            <div class="col-md-4">
              <p class="mb-1 text-muted fw-semibold">Ubicacion</p>
              <p class="fw-bold fs-5 text-dark mb-0">{{ trabajo.ubicacion }}</p>
            </div>
            <div class="col-md-4">
              <p class="mb-1 text-muted fw-semibold">Rango Salarial</p>
              <p class="fw-bold fs-5 text-success mb-0">{{ trabajo.salario || 'A convenir' }}</p>
            </div>
          </div>
        </div>

        <div class="card-body p-5">
          <h4 class="mb-4 fw-bold">Descripcion del Puesto</h4>
          <p class="card-text text-secondary lh-lg fs-5" style="white-space: pre-wrap;">{{ trabajo.descripcion }}</p>
        </div>
        
        <div class="card-footer bg-white p-5 text-end border-0">
          <button class="btn btn-primary btn-lg shadow-sm px-5 py-3 rounded-pill fw-bold" @click="aplicar">Postularme ahora</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getTrabajo } from '@/services/trabajoService';

const route = useRoute();
const trabajo = ref(null);
const loading = ref(false);
const error = ref('');

onMounted(async () => {
  loading.value = true;
  try {
    trabajo.value = await getTrabajo(route.params.id);
  } catch (err) {
    error.value = 'No se pudo cargar la informacion del empleo.';
  } finally {
    loading.value = false;
  }
});

const aplicar = () => {
  alert('Funcionalidad de aplicar en desarrollo. ¡Pronto disponible!');
};
</script>
