<template>
  <div id="PlayerAnouncement">
      <div class="title">
          {{ $t('playeranouncement.turn') }} {{turn}}
      </div>
      <div class="anounce">
          <div id="anounce_sub1">
              {{ $t('playeranouncement.title') }}
          </div>
          <div id="ellipse">
              {{ playerName }}
          </div>
      </div>
  </div>
</template>

<script>
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
  }
}
</script>

<style scoped>
@font-face {
    font-family: Spicy Rice;
    src: url(https://fonts.google.com/specimen/Spicy+Rice);
    /*font not found*/
}

@font-face {
    font-family: Raleway;
    src: url(https://fonts.google.com/specimen/Raleway);
    /*font not found*/
}

#PlayerAnouncement
{
    background: #5E8C6A;

    height: 200px;

    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: 20% 80%;
    gap: 0px 0px;
    grid-template-areas:
    "title"
    "anounce";
}

.title
{
    grid-area: "title";
    font-family: Spicy Rice;
    font-style: normal;
    font-weight: normal;
    font-size: 36px;
    line-height: 32px;
    color: #F2C45A;
}

.anounce
{
    width: 100%;
    height: 100%;

    grid-area: "anounce";
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

#ellipse
{
    width: 100px;
    height: 100px;

    border-radius: 50%;

    background-color: #88A65E;

    display: flex;
    align-items: center;
    justify-content: center;

    font-family: Spicy Rice;
    font-style: normal;
    font-weight: normal;
    line-height: 90%;
    color: #8C2318;
    font-size: 32px;

    text-shadow: 0px 4px 0px #F2C45A;

    animation: spin_scale 2s;
}

@keyframes spin_scale
{
    0%
    {
        font-size: 0px;
        width: 28px;
        height: 28px;
    }

    50%
    {
        font-size: 12px;
        width: 100px;
        height: 100px;
        transform: rotate(180deg);
    }

    100%
    {
        font-size: 32px;
        width: 100px;
        height: 100px;
        transform: rotate(360deg);
    }
}

#anounce_sub1
{
    font-family: Raleway;
    font-style: normal;
    font-weight: bold;
    font-size: 25px;
    line-height: 90%;
    color: #F2C45A;
    z-index: 100;
    transform: rotate(-10deg) translate(0, 20px);
}
</style>
