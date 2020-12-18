import originalTranslations from '../../src/assets/lang'

/**
 * Deeply remove values contained by an object
 *
 * @param obj Target
 */
const removeValues = (obj) => {
  if (!(obj instanceof Object)) {
    return
  }

  for (const key in obj) {
    if (obj[key] instanceof Object) {
      removeValues(obj[key])
    } else {
      obj[key] = undefined
    }
  }
}

describe('i18n', () => {
  test('Assert contents', () => {
    // Remove values to test only keys
    const translations = JSON.parse(JSON.stringify(originalTranslations))
    removeValues(translations)

    for (const lang in translations) {
      for (const otherLang in translations) {
        // Skip comparison between the same language
        if (lang === otherLang) {
          continue
        }
        expect(translations[lang]).toStrictEqual(translations[otherLang])
      }
    }
  })
})
