<template>
  <div class="payment-systems-form">
    <form
      action="#"
      class="payment-systems-form__form"
      @submit.prevent="onSubmit"
    >
      <app-select
        v-model="values.paymentSystem"
        label="Платежная система"
        :options="paymentSystemItems"
        :errors="errors.paymentSystem"
        :reduce="(item) => item.value"
        :searchable="false"
      />
      <app-input
        v-model="values.login"
        label="Логин API"
        :errors="errors.login"
      />
      <app-input
        v-model="values.password"
        label="Пароль API"
        :errors="errors.password"
      />
      <div class="text-center">
        <app-button
          color="orange-grad"
          class="payment-systems-form__btn"
          type="submit"
          >добавить</app-button
        >
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import AppSelect from "../../AppSelect.vue";
import useField from "@/compositions/validators/useField";
import useForm from "@/compositions/validators/useForm";
import { Component, Vue } from "vue-property-decorator";
import { useApiCreatePaymentSystem } from "@/api/paysystem";
import * as yup from "yup";
import { errorHandler } from "@/helpers/error-handler";
import { PaymentSystemInfo } from "@/types/payment-system.enum";
@Component({
  components: { AppSelect },
  setup(props, { emit }) {
    const { values, handleSubmit, errors, serialize } = useForm({
      fields: {
        paymentSystem: useField("", [yup.string().required()]),
        login: useField("", [yup.string().required()]),
        password: useField("", [yup.string().required()]),
      },
      watchAfterSubmit: true,
    });
    const onSubmit = handleSubmit(async () => {
      const toSend = serialize();
      const { exec: create, error } = useApiCreatePaymentSystem({
        toast: {
          success: () => "Платежная система добавлена!",
          error: errorHandler(),
        },
      });
      await create({
        loginApi: toSend.login,
        passwordApi: toSend.password,
        name: toSend.paymentSystem,
      });
      if (error.value) {
        return;
      }

      emit("send");
    });

    const paymentSystemItems = Object.keys(PaymentSystemInfo).map((key) => ({
      label: PaymentSystemInfo[key].name,
      value: key,
    }));
    return {
      onSubmit,
      values,
      errors,
      paymentSystemItems,
    };
  },
})
export default class PaymentSystemsAddForm extends Vue {}
</script>

<style lang="scss">
.payment-systems-form {
  &__btn {
    margin-top: 2rem;
    padding-left: 7rem;
    padding-right: 7rem;
    @include xs {
      margin-top: 0;
    }
  }
  .app-input {
    margin-bottom: 2rem;
    @include xs {
      margin-bottom: 0;
    }
  }
}
</style>