<template>
  <header class="top-0 shadow-md bg-green-200 py-10">
    <nav class="container flex flex-row justify-between items-center">
      <RouterLink :to="Translation.i18nRoute({ name: 'home' })">
        <div class="flex flex-row items-center gap-3 font-normal text-2xl">
          <font-awesome-icon icon="fa-bolt" size="2x" class="text-yellow-500" />
          <span>{{ $t('nav.logo') }}</span>
        </div>
      </RouterLink>
      <LangSwitcher />
    </nav>
  </header>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import LangSwitcher from './LangSwitcher.vue'
import Translation from '../i18n/translation'
</script>
