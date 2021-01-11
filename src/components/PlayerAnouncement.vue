<template>
  <div id="PlayerAnouncement">
      <div class="title spicyRice">
          {{ $t('playeranouncement.turn') }} {{ turn }}
      </div>
      <div class="anounce">
          <div id="anounce_sub1" class="font_size_annonce_sub1_pc ralewayRegular" v-if="!isMobileOnly">
              {{ $t('playeranouncement.title1') }}<br/>{{ $t('playeranouncement.title2') }}
          </div>
          <div id="anounce_sub1" class="font_size_annonce_sub1_mobile ralewayRegular" v-if="isMobileOnly">
              {{ $t('playeranouncement.title1') }}<br/>{{ $t('playeranouncement.title2') }}
          </div>
          <div id="ellipse" class="extra_ellipse_pc spicyRice" v-if="!isMobileOnly">
              {{ playerName }}
          </div>
          <div id="ellipse" class="extra_ellipse_mobile spicyRice" v-if="isMobileOnly">
              {{ playerName }}
          </div>
      </div>
  </div>
</template>

<script>
import { isMobileOnly } from 'mobile-device-detect'
export default {
  name: 'PlayerAnouncement',
  props: {
    playerName: {
      type: String,
      required: true
    },
    turn: {
      type: Number,
      required: true
    }
  },
  data: () => ({
    isMobileOnly: isMobileOnly
  })
}
</script>

<style scoped>

#PlayerAnouncement
{
    height: 100vh !important;
    background: var(--secondaryDarker);
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: 20% 80%;
    gap: 0px 0px;
    grid-template-areas:
    "title"
    "anounce";
    overflow: hidden;
}

.title
{
    grid-area: "title";
    font-style: normal;
    font-weight: normal;
    font-size: 10vh;
    line-height: 140%;
    color: var(--textlighter);
}

.anounce
{
    transform: translate(0, -8vh);
    grid-area: "anounce";
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

#ellipse
{
    border-radius: 50%;

    background-color: var(--secondaryLighter);

    display: flex;
    align-items: center;
    justify-content: center;

    font-style: normal;
    font-weight: normal;
    line-height: 90%;
    color: var(--primaryLighter);

    text-shadow: 0px 3px 0px var(--primary);
}

.extra_ellipse_pc
{
    font-size: 7vw;
    animation: spin_scale_pc 2s;
    width: 30vw;
    height: 30vw;
}

.extra_ellipse_mobile
{
    font-size: 10vw;
    animation: spin_scale_mobile 2s;
    width: 60vw;
    height: 60vw;
}

@keyframes spin_scale_pc
{
    0%
    {
        font-size: 0vw;
        width: 1vw;
        height: 1vw;
    }

    50%
    {
        width: 30vw;
        height: 30vw;
    }

    100%
    {
        font-size: 7vw;
        width: 30vw;
        height: 30vw;
        transform: rotate(360deg);
    }
}

@keyframes spin_scale_mobile
{
    0%
    {
        font-size: 0vw;
        width: 1vw;
        height: 1vw;
    }

    50%
    {
        width: 60vw;
        height: 60vw;
    }

    100%
    {
        font-size: 10vw;
        width: 60vw;
        height: 60vw;
        transform: rotate(360deg);
    }
}

#anounce_sub1
{
    font-style: normal;
    font-weight: bold;
    line-height: 90%;
    color: var(--textlighter);
    z-index: 100;
    transform: rotate(-10deg) translate(0, 1.2vh);
}

.font_size_annonce_sub1_pc
{
    font-size: 4vw;
}

.font_size_annonce_sub1_mobile
{
    font-size: 10vw;
}

</style>
