<template>
  <div class="header-account">
    <router-link :to="{ name: 'SettingsProfile' }" class="header-account__user">
      <div class="header-account__icon">
        <svgUser />
      </div>
      <div class="header-account__user-name">
        <span class="md-hidden"> {{ userName }}</span>
      </div>
    </router-link>
    <header-taxy-balance class="header-account__balance" />
    <a href="#" class="header-account__exit" @click.prevent="exit">Выход</a>
  </div>
</template>

<script lang="ts">
import HeaderTaxyBalance from "./HeaderTaxyBalance.vue";
import { Component, Vue } from "vue-property-decorator";
import svgUser from "@/assets/icons/user.svg";
import { UserModule } from "@/store/modules/user";
@Component({
  components: {
    svgUser,
    HeaderTaxyBalance,
  },
  setup() {
    const exit = async () => {
      await UserModule.logout();
    };
    return {
      exit,
    };
  },
})
export default class HeaderAccount extends Vue {
  get userName() {
    return UserModule.user?.fio;
  }
}
</script>

<style lang="scss">
.header-account {
  color: $purple;
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: $fz_xs;
  flex-shrink: 0;
  @include md {
    color: $white;
    margin-left: auto;
  }
  a {
    @include md {
      color: $white;
    }
  }
  &__icon {
    font-size: 0;
    @include md {
    }
  }
  &__balance {
    
  }
  &__user {
    display: flex;
    align-items: center;

    &-name {
      text-transform: uppercase;
      margin-left: 12px;
      @include md {
        margin-left: 0;
      }
    }
  }
  &__user,
  &__balance {
    &::after {
      content: "";
      display: block;
      background: $purple;
      width: 1px;
      margin: 0 12px;
      height: 15px;
      @include md {
        background: $white;
      }
    }
  }
}
</style>