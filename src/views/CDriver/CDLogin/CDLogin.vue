<template>
  <div class="page-modern-login modern-login">
    <modern-login-layout>
      <template #title>Авторизация</template>
      <template #form><modern-login-form /></template>
      <template #btns>
        <div class="modern-login__btn">
          <div class="modern-login__btn-icon"><svgTaxy width="20" /></div>
          <div class="modern-login__btn-text">Подключение водителей</div>
        </div>
        <div class="modern-login__btn">
          <div class="modern-login__btn-icon"><svgPower width="20" /></div>
          <div class="modern-login__btn-text">Подключить свой автопарк</div>
        </div>
        <div class="modern-login__btn">
          <div class="modern-login__btn-icon"><svgRentCar width="20" /></div>
          <div class="modern-login__btn-text">Аренда автомобиля</div>
        </div>
      </template>
    </modern-login-layout>
  </div>
</template>

<script lang="ts">
import ModernLoginLayout from "@/components/ModernLogin/ModernLoginLayout.vue";
import ModernLoginForm from "@/components/ModernLogin/ModernLoginForm.vue";
import { Component, Vue } from "vue-property-decorator";
import svgLogo from "@/assets/icons/modern_logo.svg";
import svgPower from "@/assets/icons/power.svg";
import svgTaxy from "@/assets/icons/connect_taxy.svg";
import svgRentCar from "@/assets/icons/rent_car.svg";
import svgChat from "@/assets/icons/chat_round.svg";
import useLoginForm from "@/components/Auth/Login/useLoginForm";
@Component({
  components: {
    svgLogo,
    ModernLoginForm,
    svgPower,
    svgChat,
    ModernLoginLayout,
    svgTaxy,
    svgRentCar,
  },

})
export default class ModernLogin extends Vue {}
</script>

<style lang="scss">
.modern-login {
  background: url(~@/assets/img/modern_login_header.png) center top no-repeat;
  background-size: 100% 440px;
  padding-bottom: 5rem;

  &__header {
    padding: 8rem 0;
    text-align: center;
  }
  .form-title {
    text-align: center;
    margin-bottom: 50px;
  }
  &__form-wrapper {
    max-width: 700px;
    margin: 0 auto;
  }
  &__form {
    &-card {
      background: #ffffff;
      box-shadow: 0px 4px 15px rgba(93, 85, 208, 0.45);
      border-radius: 15px;
      padding: 5rem;
      @include md {
        padding: 3rem;
      }
      @include xs {
        padding: 4rem 2rem;
      }
    }
  }
  &__btns {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 40px;
  }
  &__btn {
    padding: 1.3rem 5rem;
    border: 1px solid rgba(184, 181, 255, 0.15);
    box-sizing: border-box;
    box-shadow: 0px 7px 20px rgba(93, 85, 208, 0.15);
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: $transition;
    @include md {
      padding: 1.3rem 3rem;
    }
    &:hover {
      box-shadow: none;
    }
    svg {
      margin-right: 15px;
    }
  }
  &__support {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #b8b5ff;
    svg {
      margin-right: 10px;
    }
  }
}
</style>