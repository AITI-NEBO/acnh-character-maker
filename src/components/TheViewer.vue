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

    <button class="btn" type="button" @click="downloadSVGAsPNG">
      {{ downloadText }}
    </button>
    <button class="btn" type="button" @click="setAvatarBitrix">
      Установить аватар в Битрикс24
    </button>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TheCharacter from '@/components/TheCharacter.vue';

export default defineComponent({
  components: { TheCharacter },
  data() {
    return {
      downloadText: 'Скачать аватар',
    };
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
          scale: svg.clientWidth < 300 ? 3 : 1,
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
          scale: svg.clientWidth < 300 ? 3 : 1,
        }).then((canvas) => {
          this.downloadCanvas(canvas);
          this.downloadText = 'Скачать аватар';
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
    margin: 10vw;
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
