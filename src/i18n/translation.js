import i18n from '@/i18n'

const Translation = {
  get defaultLocale() {
    return import.meta.env.VITE_DEFAULT_LOCALE
  },
  get supportedLocales() {
    return import.meta.env.VITE_AVALIABLE_LOCALES.split(',')
  },
  get currentLocale() {
    return i18n.global.locale.value
  },
  set currentLocale(newLocale) {
    i18n.global.locale.value = newLocale
  },
  async switchLang(newLocale) {
    Translation.currentLocale = newLocale
    document.querySelector('html').setAttribute('lang', newLocale)
    localStorage.setItem('translation', newLocale)
  },
  userLocale() {
    return localStorage.getItem('translation')
      ? localStorage.getItem('translation')
      : Translation.defaultLocale
  },

  async routeMiddleware(to, from, next) {
    const paramsLocale = to.params.locale

    if (!paramsLocale) {
      return next(Translation.defaultLocale)
    }

    await Translation.switchLang(paramsLocale)

    return next()
  },
  i18nRoute(to) {
    return {
      ...to,
      params: {
        locale: Translation.currentLocale,
        ...to.params
      }
    }
  }
}

export default Translation
