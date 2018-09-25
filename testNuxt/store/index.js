
import Vue from 'vue'
import Vuex from 'vuex'
import { api } from '@/modules/api'
import * as types from './mutation-types'
import account from './modules/account'
// import auth from './modules/auth'
import user from './modules/user'

/* Plug in Vuex store */
Vue.use(Vuex)

export const state = {
  recaptchaSiteKey: '6Ld_P0AUAAAAAM12g4eYCWxb7xaCvbKnb7QVvOUl',
  showSpinner: isSpinnerShow,
  lang: lang || defaultLang,
  locale: defaultLocale.locale,
  loadingLocale: defaultLocale.loadingLocale,
  languages: langList,
  currencies: [],
  countries,
  // TODO: change link for FTM tradingPlatform
  tradingPlatformLink: 'https://ftmcapitals.sirixtrader.com/',
  // tradingPlatformLinkDemo: '',
  currentCountry: {},
  userCountryBlocked: false,
  serverMsg: {
    isServerError: false,
    serverErrorMessage: ''
  },
  matched: {},
  // articles: [],
  // currentArticle: {},
  currentSSO: ''
}

export const getters = {
  getCountryNameByIP (state) {
    return state.currentCountry || state.countries[0]
  }
}

export const actions = {
  getCountriesList ({commit, state}) {
    if (state.countries.length) return
    return new Promise((resolve, reject) => {
      Vue.http.get(api.publicApi.countries())
        .then(res => {
          commit(types.SET_COUNTRIES_LIST, res.body)
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  contactUs ({commit}, payload) {
    return new Promise((resolve, reject) => {
      Vue.http.post(api.publicApi.contactUsRequest(), payload)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  getLocale ({ commit }, lang) {
    return new Promise((resolve, reject) => {
      Vue.http.get(api.cms.localization(lang.value))
        .then(res => {
          commit(types.SET_LANGUAGE, lang)
          commit(types.GET_LOCALE, res.body.Text)
          commit(types.SET_SPINNER, false)
          let currencies = [
            {name: 'USD', show: res.body.Text['CAuthCurrencyUSD'], symbol: '$'}
            // {name: 'GBP', symbol: '£'},
            // {name: 'EUR', show: res.body.Text['CAuthCurrencyEUR'], symbol: '€'}
          ]
          commit(types.SET_CURRENCIES, currencies)
          document.getElementsByTagName('html')[0].setAttribute('lang', lang.value)
          resolve()
        })
        .catch(res => {
          console.log(res)
        })
    })
  },
  userCountryBlocked ({ commit }) {
    commit(types.BLOCK_USER_COUNTRY)
  }
}

export const mutations = {
  [types.SET_COUNTRIES_LIST] (state, countries) {
    state.countries = countries
    localStorage.setItem('countries', JSON.stringify(countries))
  }
}

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters,
  modules: {
    account,
    user
  }
})