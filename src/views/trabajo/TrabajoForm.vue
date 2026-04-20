<template>
  <div class="row justify-content-center py-5">
    <div class="col-lg-8 col-xl-7">
      <div class="card border-0 shadow-sm rounded-4">
        <div class="card-header bg-white border-bottom-0 pt-4 pb-0 px-4 d-flex justify-content-between align-items-center">
          <h4 class="mb-0 fw-bold text-primary">{{ isEdit ? 'Editar Empleo' : 'Nuevo Empleo' }}</h4>
          <button class="btn btn-light btn-sm rounded-pill fw-medium text-secondary" @click="$router.push('/trabajos')">Volver</button>
        </div>

        <div class="card-body p-4">
          <form @submit.prevent="guardar">
            <div v-if="error" class="alert alert-danger rounded-3">{{ error }}</div>

            <div class="mb-4">
              <label for="titulo" class="form-label fw-semibold text-secondary">Titulo de la Oferta</label>
              <input type="text" id="titulo" class="form-control form-control-lg bg-light border-0" v-model="form.titulo" required placeholder="Ej. Desarrollador Senior">
            </div>

            <div class="row g-3 mb-4">
              <div class="col-md-6">
                <label for="categoria" class="form-label fw-semibold text-secondary">Categoria</label>
                <select id="categoria" class="form-select form-select-lg bg-light border-0" v-model="form.categoriaId" required>
                  <option value="" disabled>Selecciona especialidad</option>
                  <option v-for="cat in categorias" :key="cat.id" :value="cat.id">
                    {{ cat.nombre }}
                  </option>
                </select>
              </div>
              <div class="col-md-6">
                <label for="empresa" class="form-label fw-semibold text-secondary">Empresa contratante</label>
                <input type="text" id="empresa" class="form-control form-control-lg bg-light border-0" v-model="form.empresa" required placeholder="Nombre de empresa">
              </div>
            </div>

            <div class="row g-3 mb-4">
              <div class="col-md-6">
                <label for="ubicacion" class="form-label fw-semibold text-secondary">Ubicacion / Modalidad</label>
                <input type="text" id="ubicacion" class="form-control form-control-lg bg-light border-0" v-model="form.ubicacion" required placeholder="Ej. Remoto Mundial">
              </div>
              <div class="col-md-6">
                <label for="salario" class="form-label fw-semibold text-secondary">Rango Salarial</label>
                <input type="text" id="salario" class="form-control form-control-lg bg-light border-0" v-model="form.salario" placeholder="Ej. 2000 USD / A convenir">
              </div>
            </div>

            <div class="mb-4">
              <label for="descripcion" class="form-label fw-semibold text-secondary">Descripcion del Puesto</label>
              <textarea id="descripcion" class="form-control bg-light border-0" v-model="form.descripcion" required rows="5" placeholder="Detalla los requisitos, tareas a cumplir y perfiles buscados..."></textarea>
            </div>

            <button type="submit" class="btn btn-primary btn-lg w-100 rounded-pill shadow-sm" :disabled="loading">
              {{ loading ? 'Publicando Oferta...' : 'Publicar Oferta' }}
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
import { getTrabajo, createTrabajo, updateTrabajo } from '@/services/trabajoService';
import { getCategorias } from '@/services/categoriaService';

const route = useRoute();
const router = useRouter();

const form = ref({
  titulo: '',
  categoriaId: '',
  empresa: '',
  ubicacion: '',
  salario: '',
  descripcion: ''
});

const categorias = ref([]);
const loading = ref(false);
const error = ref('');

const isEdit = computed(() => !!route.params.id);

onMounted(async () => {
  try {
    categorias.value = await getCategorias();
    
    if (isEdit.value) {
      loading.value = true;
      const data = await getTrabajo(route.params.id);
      form.value = { 
        titulo: data.titulo,
        categoriaId: data.categoriaId,
        empresa: data.empresa,
        ubicacion: data.ubicacion,
        salario: data.salario,
        descripcion: data.descripcion
      };
    }
  } catch (err) {
    error.value = 'Error al cargar los datos.';
  } finally {
    loading.value = false;
  }
});

const guardar = async () => {
  try {
    loading.value = true;
    error.value = '';
    
    if (isEdit.value) {
      await updateTrabajo(route.params.id, form.value);
    } else {
      await createTrabajo(form.value);
    }
    
    router.push('/trabajos');
  } catch (err) {
    error.value = 'Error al guardar la oferta.';
  } finally {
    loading.value = false;
  }
};
</script>
