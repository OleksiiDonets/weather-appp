<template>
  <div class="flex gap-3">
    <label
      v-for="locale in locales"
      :key="`lang-${locale}`"
      class="cursor-pointer"
      :class="{ 'text-orange-400': Translation.currentLocale === locale }"
    >
      <input
        type="radio"
        name="lang"
        :id="`lang-${locale}`"
        :value="locale"
        class="hidden"
        @change="langSwitcher"
      />
      {{ $t(`locale.${locale}`) }}
    </label>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import Translation from '@/i18n/translation'

const router = useRouter()
const locales = Translation.supportedLocales
const langSwitcher = async (event) => {
  await Translation.switchLang(event.target.value)
  await router.push({ params: { locale: event.target.value } })
}
</script>
