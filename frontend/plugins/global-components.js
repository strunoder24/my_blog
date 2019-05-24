import vue from 'vue'

import Input from '~/components/UI/Input.vue'
import SimpleButton from '~/components/UI/SimpleButton.vue'


// Регистрирую глобальные компоненты
vue.component('InputComponent', Input);
vue.component('SimpleButton', SimpleButton);