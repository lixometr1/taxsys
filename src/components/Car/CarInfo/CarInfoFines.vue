<template>
  <div class="car-info-fines">
    <app-accardion
      class="color-grey-2 mb-20 font-md"
      contentClass="font-sm color-grey-3"
      :isOpen="true"
    >
      <template #header>
        <app-accardion-col class="col-12"
          ><div class="color-purple">Штрафы</div></app-accardion-col
        ></template
      >
      <template>
        <app-accardion-col class="col-xl-6">
          <div class="row align-items-center">
            <div class="col">Автоматичесая оплата штрафов</div>
            <div class="col">
              <app-switcher :value="autoFines" @input="changeFines" />
            </div>
          </div>
        </app-accardion-col>

        <app-accardion-col class="col-12">
          <div class="car-info-fines__item" v-for="(item, idx) in fines" :key="idx">
            <div class="row">
              <div class="col-xl-4 car-info-fines__item-col">
                Постановление №: {{item.issue_number}}
              </div>
              <div class="col-xl-2 car-info-fines__item-col">{{item.created_at | moment('DD.MM.YYYY')}}</div>
              <div class="col-xl-2 car-info-fines__item-col">{{item.koap_code}}</div>
              <div class="col-xl-2 car-info-fines__item-col">
                {{item.getPrice()}} {{ currency }}
              </div>
              <div class="col-xl-2 car-info-fines__item-col">
                <app-status size="sm" color="green" :stroke="true"
                  >{{item.getStatus()}}</app-status
                >
              </div>
            </div>
          </div>
        </app-accardion-col>
      </template>
    </app-accardion>
  </div>
</template>

<script lang="ts">
import CarInfoTrackerForm from "./CarInfoTrackerForm.vue";
import { Component, Prop, Vue } from "vue-property-decorator";
import { computed, ref, toRefs } from "@vue/composition-api";
import svgPlus from "@/assets/icons/plus.svg";
import useModal from "@/compositions/useModal";
import { ModalName } from "@/types/modal.enum";
import AppStatus from "@/components/AppStatus.vue";
import { useApiCarUpdateRequests } from "@/api/car";
import { CarRequestsDto } from "@/dto/car-requests.dto";
import { plainToClass } from "class-transformer";
import { Car } from "@/models/car.entity";
import { errorHandler } from "@/helpers/error-handler";
interface IProps {
  [key: string]: any;
  item: Car;
}
@Component({
  setup(props: IProps, { emit }) {
    const { item } = toRefs<IProps>(props);
    const autoFines = computed(() => item.value.options?.fines_autopay);
    const addRecord = () => {
      const { showByName } = useModal();
      showByName(ModalName.addCarRecord);
    };
    const changeFines = async (newValue: boolean) => {
      const { exec, error } = useApiCarUpdateRequests({
        toast: { error: errorHandler(), success: () => "Обновлено" },
      });
      const data: CarRequestsDto = {
        ...item.value.options,
        fines_autopay: newValue,
      };
      const toSend = plainToClass(CarRequestsDto, data);
      await exec({ id: item.value.id, data: toSend });
      emit("refresh");
      if (error.value) return;
    };
    return {
      changeFines,
      addRecord,
      autoFines,
    };
  },
  components: { CarInfoTrackerForm, svgPlus, AppStatus },
})
export default class CarInfoFines extends Vue {
  @Prop({type: Object, default: () => ({})}) item: Car;
  get currency() {
    return this.$store.getters.currency;
  }
  get fines() {
    return this.item.fines || []
  }
}
</script>

<style lang="scss">
.car-info-fines {
  &__item {
    padding: 2.5rem 0;
    border-top: 1px solid #f2f2f2;

    &-col {
      display: flex;
      align-items: center;
      @include lg {
        padding-top: 0.75rem;
        padding-bottom: 0.5rem;
      }
    }
  }
}
</style>