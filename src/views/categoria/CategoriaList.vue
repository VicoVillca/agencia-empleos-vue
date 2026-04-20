<template>
  <div class="container py-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2 class="fw-bold text-primary mb-0">Categorias de Empleos</h2>
      <button class="btn btn-primary rounded-pill shadow-sm px-4 fw-medium" @click="$router.push('/categorias/nuevo')">+ Nueva Categoria</button>
    </div>

    <div v-if="loading" class="text-center text-muted my-5">
      <div class="spinner-border text-primary" role="status"></div>
      <p class="mt-2">Cargando categorias...</p>
    </div>
    <div v-else-if="error" class="alert alert-danger shadow-sm">{{ error }}</div>
    <div v-else>
      <div v-if="categorias.length === 0" class="alert alert-info shadow-sm text-center">No hay categorias registradas.</div>
      <div v-else class="card border-0 shadow-sm rounded-4 overflow-hidden">
        <table class="table table-hover mb-0 bg-white">
          <thead class="table-light">
            <tr>
              <th class="py-3 px-4">ID</th>
              <th class="py-3 px-4">Nombre</th>
              <th class="py-3 px-4">Descripcion</th>
              <th class="py-3 px-4 text-center" width="200">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="cat in categorias" :key="cat.id">
              <td class="py-3 px-4 align-middle">{{ cat.id }}</td>
              <td class="py-3 px-4 align-middle fw-medium">{{ cat.nombre }}</td>
              <td class="py-3 px-4 align-middle text-muted">{{ cat.descripcion }}</td>
              <td class="py-3 px-4 align-middle text-center">
                <button class="btn btn-warning btn-sm me-2 rounded-3 fw-medium" @click="$router.push(`/categorias/${cat.id}/editar`)">Editar</button>
                <button class="btn btn-outline-danger btn-sm rounded-3 fw-medium" @click="eliminar(cat.id)">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getCategorias, deleteCategoria } from '@/services/categoriaService';

const categorias = ref([]);
const loading = ref(false);
const error = ref('');

const loadCategorias = async () => {
  loading.value = true;
  error.value = '';
  try {
    categorias.value = await getCategorias();
  } catch (err) {
    error.value = 'Error al cargar las categorias.';
  } finally {
    loading.value = false;
  }
};

const eliminar = async (id) => {
  if (confirm('¿Estas seguro de eliminar esta categoria?')) {
    try {
      await deleteCategoria(id);
      await loadCategorias();
    } catch (err) {
      alert('Error al eliminar la categoria');
    }
  }
};

onMounted(() => {
  loadCategorias();
});
</script>
