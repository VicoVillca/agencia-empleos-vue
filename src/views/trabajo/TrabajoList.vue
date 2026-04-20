<template>
  <div class="container py-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2 class="fw-bold text-primary mb-0">Ofertas de Empleo</h2>
      <button class="btn btn-primary rounded-pill shadow-sm px-4 fw-medium" @click="$router.push('/trabajos/nuevo')">+ Nuevo Empleo</button>
    </div>

    <!-- Filtros y Buscador -->
    <div class="row mb-4 g-3">
      <div class="col-md-8">
        <input 
          type="text" 
          v-model="searchQuery" 
          placeholder="Buscar por titulo..." 
          class="form-control form-control-lg border-0 shadow-sm"
          @input="filtrarTrabajos"
        />
      </div>
      <div class="col-md-4">
        <select v-model="selectedCategory" @change="filtrarTrabajos" class="form-select form-select-lg border-0 shadow-sm text-secondary">
          <option value="">Todas las Categorias</option>
          <option v-for="cat in categorias" :key="cat.id" :value="cat.id">
            {{ cat.nombre }}
          </option>
        </select>
      </div>
    </div>

    <div v-if="loading" class="text-center text-muted my-5">
      <div class="spinner-border text-primary" role="status"></div>
      <p class="mt-2">Cargando empleos...</p>
    </div>
    <div v-else-if="error" class="alert alert-danger shadow-sm">{{ error }}</div>
    <div v-else>
      <div v-if="trabajosFiltrados.length === 0" class="alert alert-info shadow-sm text-center border-0">No se encontraron empleos con esos criterios.</div>
      
      <div class="row g-4">
        <div class="col-md-4" v-for="trabajo in trabajosFiltrados" :key="trabajo.id">
          <div class="card h-100 border-0 shadow-sm rounded-4 hover-shadow">
            <div class="card-body p-4">
              <div class="d-flex justify-content-between align-items-start mb-3">
                <h5 class="card-title fw-bold text-dark w-75">{{ trabajo.titulo }}</h5>
                <span class="badge bg-primary bg-opacity-10 text-primary rounded-pill">{{ getCategoriaNombre(trabajo.categoriaId) }}</span>
              </div>
              <h6 class="card-subtitle mb-3 text-secondary">
                <i class="bi bi-building"></i> {{ trabajo.empresa }} <br>
                <small class="text-muted">{{ trabajo.ubicacion }}</small>
              </h6>
              <p class="card-text text-success fw-bold fs-5 mb-0">{{ trabajo.salario }}</p>
            </div>
            <div class="card-footer bg-white border-top-0 p-4 pt-0 d-flex justify-content-between align-items-center">
              <button class="btn btn-link px-0 text-decoration-none fw-semibold" @click="$router.push(`/trabajos/${trabajo.id}`)">Ver Detalles →</button>
              <div class="d-flex gap-2">
                <button class="btn btn-light btn-sm rounded-3 text-warning fw-bold" @click="$router.push(`/trabajos/${trabajo.id}/editar`)">Editar</button>
                <button class="btn btn-light btn-sm rounded-3 text-danger fw-bold" @click="eliminar(trabajo.id)">Eliminar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { getTrabajos, deleteTrabajo } from '@/services/trabajoService';
import { getCategorias } from '@/services/categoriaService';

const trabajos = ref([]);
const categorias = ref([]);
const loading = ref(false);
const error = ref('');

const searchQuery = ref('');
const selectedCategory = ref('');

const loadData = async () => {
  loading.value = true;
  error.value = '';
  try {
    const [trabajosData, categoriasData] = await Promise.all([
      getTrabajos(),
      getCategorias()
    ]);
    trabajos.value = trabajosData;
    categorias.value = categoriasData;
  } catch (err) {
    error.value = 'Error al cargar los datos.';
  } finally {
    loading.value = false;
  }
};

const eliminar = async (id) => {
  if (confirm('¿Estas seguro de eliminar esta oferta de empleo?')) {
    try {
      await deleteTrabajo(id);
      await loadData();
    } catch (err) {
      alert('Error al eliminar');
    }
  }
};

const getCategoriaNombre = (id) => {
  const cat = categorias.value.find(c => c.id == id);
  return cat ? cat.nombre : 'Desconocida';
};

const trabajosFiltrados = computed(() => {
  return trabajos.value.filter(t => {
    const matchSearch = t.titulo.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchCategory = selectedCategory.value ? t.categoriaId == selectedCategory.value : true;
    return matchSearch && matchCategory;
  });
});

onMounted(() => {
  loadData();
});
</script>
