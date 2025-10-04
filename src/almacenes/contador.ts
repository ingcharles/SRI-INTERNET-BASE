import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('contador', () => {
  const contador = ref(0)
  const contadorDoble = computed(() => contador.value * 2)
  function incremento() {
    contador.value++
  }

  return { contador, contadorDoble, incremento }
})
