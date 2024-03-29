<template>
  <div class="driver-check-form">
    <form action="#" class="driver-check-form__form" @submit.prevent="onSubmit">
      <form-schema :schema="schema" class="row" />

      <div
        class="flex justify-content-center align-items-center driver-check-form__btn-wrapper"
      >
        <app-button
          type="submit"
          class=""
          color="purple-grad driver-check-form__btn"
          >ПРОВЕРИТЬ</app-button
        >
        <app-tooltip-info class="driver-check-form__info-wrapper">
          Услуга проверка водителя является платной и составляет 20 рублей за
          одну проверку.
          <p class="mt-5 mb-5">Оплата списывается с баланса TaxSys.</p>
          Информация носит исключительно справочный характер. Заказывая данную
          услугу вы полностью и безоговорочно соглашаетесь с условием оферты.
        </app-tooltip-info>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import FormSchema from "../FormSchema/FormSchema.vue";
import AppTooltipInfo from "../AppTooltipInfo.vue";
import AppDatePicker from "@/components/AppDatePicker.vue";
import AppTooltip from "../AppTooltip.vue";
import { Component, Vue } from "vue-property-decorator";
import { useApiDriverCheck } from "@/api/driver-check";
import useForm from "@/compositions/validators/useForm";
import useField from "@/compositions/validators/useField";
import * as yup from "yup";
import { computed, ref } from "@vue/composition-api";
import svgInfo from "@/assets/icons/info.svg";
import useRouter from "@/compositions/useRouter";
import { fields } from "./driver-check-fields";
import { schema } from "./driver-check-schema";
interface IDefaultData {
  [key: string]: any;
}
@Component({
  setup(props, { emit }) {
    const router = useRouter();
    const query = router.currentRoute.query;
    const defaultData: IDefaultData = {
      name: query.name,
      lastName: query.surname,
      middleName: query.lastname,
      passport: query.numberOfPassport,
      serialLicense: query.driverLicense,
    };
    if (query.dateOfBirth && typeof query.dateOfBirth === "string") {
      const dateOfBirth = new Date(query.dateOfBirth);
      defaultData.birthday = dateOfBirth;
    }
    if (
      query.dateDriverLicense &&
      typeof query.dateDriverLicense === "string"
    ) {
      const test = new Date(query.dateDriverLicense);
      defaultData.dateLicense = test;
    }
    const { exec: sendForm, result, error } = useApiDriverCheck({
      toast: {
        error: (err) => {
          return err.data.message;
        },
        success: (data) => {
          return data.message;
        },
      },
    });
    // const form = useForm({
    //   fields: {
    //     name: useField(defaultData.name, [yup.string().required()]),
    //     surname: useField(defaultData.surname, [yup.string().required()]),
    //     lastname: useField(defaultData.lastname, [yup.string().required()]),
    //     dateOfBirth: useField(defaultData.dateOfBirth, [yup.date().required()]),
    //     numberOfPassport: useField(defaultData.numberOfPassport, [
    //       yup.string().required(),
    //     ]),
    //     driverLicense: useField(defaultData.driverLicense, [
    //       yup.string().required(),
    //     ]),
    //     dateDriverLicense: useField(defaultData.dateDriverLicense, [
    //       yup.date().required(),
    //     ]),
    //   },
    //   watchAfterSubmit: true,
    // });
    const form = useForm({
      fields,
      rename: {
        lastName: "surname",
        middleName: "lastname",
        birthday: "dateOfBirth",
        passport: "numberOfPassport",
        serialLicense: "driverLicense",
        dateLicense: "dateDriverLicense",
      },
    });
    Object.assign(form.values, defaultData)

    const onSubmit = form.handleSubmit(async () => {
      console.log(form.serialize())
      await sendForm(form.serialize());
    });
    const showInfo = ref(false);
    return {
      form,
      onSubmit,
      showInfo,
      schema,
    };
  },
  components: {
    svgInfo,
    AppTooltip,
    AppDatePicker,
    AppTooltipInfo,
    FormSchema,
  },
})
export default class DriverCheckFrom extends Vue {}
</script>

<style lang="scss">
.driver-check-form {
  max-width: 800px;
  margin: 0 auto;
  .row {
    margin-bottom: 3rem;
    @include sm {
      margin-bottom: 0;
    }
  }
  &__btn-wrapper {
    margin-top: 7rem;
    @include sm {
      margin-top: 1rem;
    }
  }
  &__btn {
    padding: 1.2rem 6rem;
    margin-right: 10px;
    @include xs {
      padding: 0.8rem 4rem;
    }
  }
  &__info-wrapper {
    .app-tooltip-info__tooltip {
      &::before {
        top: 10px !important;
        transform: rotate(45deg) translateY(0) !important;
      }
    }
  }
}
</style>