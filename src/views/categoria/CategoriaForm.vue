<template>
  <div class="row justify-content-center py-5">
    <div class="col-md-7 col-lg-6">
      <div class="card border-0 shadow-sm rounded-4">
        <div class="card-header bg-white border-bottom-0 pt-4 pb-0 px-4 d-flex justify-content-between align-items-center">
          <h4 class="mb-0 fw-bold text-primary">{{ isEdit ? 'Editar Categoria' : 'Nueva Categoria' }}</h4>
          <button class="btn btn-light btn-sm rounded-pill fw-medium text-secondary" @click="$router.push('/categorias')">Volver</button>
        </div>

        <div class="card-body p-4">
          <form @submit.prevent="guardar">
            <div v-if="error" class="alert alert-danger rounded-3">{{ error }}</div>

            <div class="mb-4">
              <label for="nombre" class="form-label fw-semibold text-secondary">Nombre de Categoria</label>
              <input type="text" id="nombre" class="form-control form-control-lg bg-light border-0" v-model="form.nombre" required placeholder="Ej. Tecnologia">
            </div>

            <div class="mb-4">
              <label for="descripcion" class="form-label fw-semibold text-secondary">Breve Descripcion</label>
              <textarea id="descripcion" class="form-control bg-light border-0" v-model="form.descripcion" required rows="4" placeholder="Detalles o rubros implicados..."></textarea>
            </div>

            <button type="submit" class="btn btn-primary btn-lg w-100 rounded-pill shadow-sm" :disabled="loading">
              {{ loading ? 'Guardando...' : 'Guardar Categoria' }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getCategoria, createCategoria, updateCategoria } from '@/services/categoriaService';

const route = useRoute();
const router = useRouter();

const form = ref({
  nombre: '',
  descripcion: ''
});

const loading = ref(false);
const error = ref('');

const isEdit = computed(() => !!route.params.id);

onMounted(async () => {
  if (isEdit.value) {
    try {
      loading.value = true;
      const data = await getCategoria(route.params.id);
      form.value = { nombre: data.nombre, descripcion: data.descripcion };
    } catch (err) {
      error.value = 'Error al cargar los datos de la categorias.';
    } finally {
      loading.value = false;
    }
  }
});

const guardar = async () => {
  try {
    loading.value = true;
    error.value = '';
    
    if (isEdit.value) {
      await updateCategoria(route.params.id, form.value);
    } else {
      await createCategoria(form.value);
    }
    
    router.push('/categorias');
  } catch (err) {
    error.value = 'Error al guardar la categoria.';
  } finally {
    loading.value = false;
  }
};
</script>
