<template>
  <div class="profile-name">
    <div class="app-card">
      <div class="profile-name__row">
        <div class="profile-name__item">
          <div class="color-purple">{{ companyName }}</div>
        </div>
        <div class="profile-name__item">
          <div class="">Директор: {{ fio }}</div>
        </div>
        <div class="profile-name__item">
          <div class="">Телефон: {{ phone }}</div>
        </div>
      </div>
      <div class="text-left">
        <app-button @click="goToDriver" color="purple-grad font-normal mt-20"
          >Перейти в водительский кабинет
          <svgArrowRight width="15" class="ml-3 color-white"
        /></app-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import useRouter from "@/compositions/useRouter";
import { UserModule } from "@/store/modules/user";
import { Component, Vue } from "vue-property-decorator";
import svgArrowRight from "@/assets/icons/arrow-right.svg";
@Component({
  components: { svgArrowRight },
  setup() {
    const goToDriver = () => {
      useRouter().push({ name: "CDFinances" });
    };
    return { goToDriver };
  },
})
export default class ProfileName extends Vue {
  get companyName() {
    return UserModule.user.partner.Name;
  }
  get fio() {
    const user = UserModule.user;
    return `${user.last_name} ${user.name} ${user.middle_name}`;
  }
  get phone() {
    return UserModule.user.Phone;
  }
}
</script>

<style lang="scss">
.profile-name {
  &__row {
    display: flex;
    @include md {
      flex-direction: column;
    }
  }
  &__item {
    font-size: $fz_md;
    color: #333;
    margin-right: 100px;
    @include lg {
      margin-right: 50px;
    }
    @include md {
      margin-right: 0;
      margin-bottom: 15px;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>