<template>
  <div class="input-block" :class="error && 'input-block__error'">
    <div class="input-block__head">
      <p v-if="label" class="input-block__label">{{ label }}</p>

    </div>
    <input
        :value="value"
        :type="type"
        @blur="emit('blur')"
        @keyup.enter="emit('enter')"
        @focus="emit('focus')"
        @input="updateValue"
    />
    <p v-if="error" class="input-block__error--text">{{ error }}</p>
  </div>
</template>

<script lang="ts" setup>
import {toRefs} from "vue";

interface IProps {
  error?: string;
  label?: string;
  value: string | number | null;
  name?: string;
  type?: string;
}

const props = withDefaults(defineProps<IProps>(), {
  error: "",
  label: "",
  value: "",
  name: "",
  type: "",
});

const emit = defineEmits(["update-value", "blur", "focus", "enter"]);
const {value, error, label, name} = toRefs(props);
const updateValue = (e: Event) => {
  const inputElement = e.target as HTMLInputElement;
  emit("update-value", {value: inputElement.value, name: name.value})
}
</script>
