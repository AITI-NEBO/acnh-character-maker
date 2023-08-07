<template>
  <section class="viewer">
    <section class="viewer__credit">
      <p>
        Сделано в
        <a class="viewer__credit-link" href="https://nebo.me">
          IT-NEBO
        </a>
      </p>
    </section>
    <div class="viewer__avatar">
      <the-character></the-character>
    </div>
<div style="display: flex">
    <button class="btn" type="button" @click="downloadSVGAsPNG">
      {{ downloadText }}
    </button>
    <button class="btn" type="button" :disabled="!bitrixToken" @click="setAvatarBitrix">

      {{setAvatarText}}
    </button>
</div>
    <div v-if="errorMessage" class="btn" style="background-color: #ff4757;font-size: 16px;text-align: center">
      {{ errorMessage }}
    </div>
    <div v-if="successMessage" class="btn" style="background-color: #61bc4e;font-size: 16px;text-align: center">
      {{ successMessage }}
    </div>


    <div class="ad" data-type="banner" data-width="100%" data-orientation="horizontal"></div>

  </section>

</template>

<script lang="ts">
/* eslint-disable */
import { defineComponent } from 'vue';
import TheCharacter from '@/components/TheCharacter.vue';
import bitrix from "@/utils/bitrixLogin";
import {Method} from "@sknebo/bitrix-js";

export default defineComponent({
  components: { TheCharacter },
  data() {
    return {
      downloadText: 'Скачать аватар',
      errorMessage:'',
      successMessage:'',
      setAvatar:false,
      setAvatarText: 'Установить аватар в Битрикс24',
      setAD:true,
      bitrixToken:true,
    };
  },
  async beforeMount  () {
    await bitrix.call('app.info' as Method, {}).then((response: any) => {
      if (response.result.STATUS === 'L') {
        this.setAD =false
      }
      if (response.result.STATUS === 'F') {
        this.setAD=true
      }
    }).catch((e:any)=>{
      this.errorMessage=e
      this.bitrixToken = false
    })

  },
  methods: {
    downloadSVGAsPNG() {
      window.scrollTo({
        top: 0,
      });
      this.downloadText = 'Загрузка...';
      const svg = document.getElementsByClassName(
        'viewer__avatar',
      )[0] as HTMLElement;
      if (svg == null) return;
      import('html2canvas').then((module) => {
        const html2canvas = module.default;
        html2canvas(svg, {
          foreignObjectRendering: false,
          allowTaint: true,
          useCORS: true,

        }).then((canvas) => {
          this.downloadCanvas(canvas);
          this.downloadText = 'Скачать аватар';
        });
      });
    },
    setAvatarBitrix() {
      window.scrollTo({
        top: 0,
      });
      this.successMessage=''
      this.errorMessage=''
      this.setAvatarText = 'Загрузка...';
      const svg = document.getElementsByClassName(
          'viewer__avatar',
      )[0] as HTMLElement;
      if (svg == null) return;
      import('html2canvas').then((module) => {
        const html2canvas = module.default;
        html2canvas(svg, {
          foreignObjectRendering: false,
          allowTaint: true,
          useCORS: true,
          backgroundColor: null

        }).then((canvas) => {
          const dataURL = canvas.toDataURL('image/png')
          bitrix.call('profile' as Method, {}).then((response: any) => {
            const userData = {
              ID: response.result.ID,
              PERSONAL_PHOTO: [
                `avatarCrossing.png`,
                `${dataURL}`.split('base64,')[1],
              ],
            }
            bitrix
                .call('user.update', userData)
                .then((response:any) => {
                  if (response.result) {
                    this.successMessage = 'Аватар успешно установлен!'
                    this.setAvatarText = 'Установить аватар в Битрикс24'
                  }
                })
                .catch(() => {
                  this.errorMessage = 'Ошибка при обновлении аватара пользователя'
                  this.setAvatarText = 'Установить аватар в Битрикс24'
                })
          }).catch((e:any)=>{
            this.errorMessage=e
          })
        });
      });
    },
    downloadCanvas(canvas: HTMLCanvasElement) {
      document.body.appendChild(canvas);
      const dataURL = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      const myEvt = new MouseEvent('click');
      a.download = 'ac-avatar.png';
      a.href = dataURL;
      a.dispatchEvent(myEvt);
    },
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/global/_variables.scss";
@import "@/styles/mixins/_mixins.scss";

.viewer {

  @include flex(center, center, column);
  margin: rem(20px);
  @media screen and (min-width: 1024px) {
    margin: 3vw;
  }
  &__credit {
    color: var(--accent-200);
    font-size: rem(12px);
    margin: rem(10px);
  }
  &__credit-link {
    color: var(--accent-200);
  }
}

</style>
