<script setup lang="ts">
import { ref } from "vue";
import { NIcon } from "naive-ui";
import SSvg from "@/components/s-svg/index.vue";
import { logout } from "@/composables";
import type { MenuOption } from "naive-ui";
import { CaretDownOutline } from "@vicons/ionicons5";
import navbar from "@/components/navbar.vue";
import { useAuthStore } from "../app/auth/auth.store";

const collapsed = ref<boolean>(true);
const router = useRouter();
const route = useRoute();
const auth = useAuthStore();
const roleData = ref<any>({}); 
const menuOptionsTemplate = [
  {
    label: "Dashboard",
    key: "/dashboard",
    icon: () =>
      h(NIcon, null, {
        default: () =>
          h(SSvg, {
            name: "icon-lab",
          }),
      }),
  },
  {
    label: "Absent Log",
    key: "/absent",
    icon: () =>
      h(NIcon, null, {
        default: () =>
          h(SSvg, {
            name: "icon-user",
          }),
      }),
  },
  {
    label: "User management",
    key: "",
    icon: () =>
      h(NIcon, null, {
        default: () =>
          h(SSvg, {
            name: "icon-gear",
          }),
      }),
    children: [
      {
        label: "User List",
        key: "/userlist",
        icon: () =>
          h(NIcon, null, {
            default: () =>
              h(SSvg, {
                name: "icon-user",
              }),
          }),
      },
      {
        label: "Role and access",
        key: "/roleaccesslist",
        icon: () =>
          h(NIcon, null, {
            default: () =>
              h(SSvg, {
                name: "icon-user",
              }),
          }),
      }
    ]
  },
];

const menuOptions = ref<MenuOption[]>(menuOptionsTemplate);
function renderMenuLabel(option: MenuOption) {
  if ("href" in option) {
    return h("a", { href: option.href, target: "_blank" }, [
      option.label as string,
    ]);
  }
  return option.label as string;
}

function expandIcon() {
  return h(NIcon, null, { default: () => h(CaretDownOutline) });
}

function onUpdateMenu(value: string): void {
  router.push(value);
}

const activeMenu = ref<string>(route.path);

const handleLogout = () => {
  logout();
  router.push("/auth/login");
};

watch(
  route,
  (to) => {
    activeMenu.value = to.path;
    if (
      to.name === "soap" ||
      to.name === "lab-rad-[id].page" ||
      to.name === "history-[id].page"
    ) {
      menuOptions.value = [
        {
          label: "Dashboard",
          key: "/dashboard",
          icon: () =>
            h(NIcon, null, {
              default: () =>
                h(SSvg, {
                  name: "icon-lab",
                }),
            }),
        },
        {
          label: "Kost",
          key: `/kost`,
          icon: () =>
            h(NIcon, null, {
              default: () =>
                h(SSvg, {
                  name: "icon-user",
                }),
            }),
        },
        {
          label: "Customer",
          key: `/customer`,
          icon: () =>
            h(NIcon, null, {
              default: () =>
                h(SSvg, {
                  name: "icon-user",
                }),
            }),
        },
      ];
    } else menuOptions.value = menuOptionsTemplate;
  },
  { flush: "pre", immediate: true, deep: true }
);

onMounted(async () => {
  if (auth.user?.roleId) {
    try {
      const res = await getRoleByIdApi(auth.user.roleId);
      roleData.value = res;

      const { view, edit } = roleData.value.access || {};
      if (!view || !edit) {
        menuOptions.value = [
          {
            label: "Dashboard",
            key: "/dashboard",
            icon: () =>
              h(NIcon, null, {
                default: () =>
                  h(SSvg, {
                    name: "icon-lab",
                  }),
              }),
          }
        ];
      } else {
        menuOptions.value = menuOptionsTemplate;
      }

    } catch (err) {
      console.error("Gagal ambil role:", err);
    }
  }
});

</script>
<template>
  <n-space vertical>
    <n-layout has-sider>
      <n-layout-sider
        bordered
        class="h-[100%]"
        collapse-mode="width"
        :collapsed-width="64"
        :width="240"
        :collapsed="collapsed"
        show-trigger
        @collapse="collapsed = true"
        @expand="collapsed = false"
      >
        <n-space vertical justify="space-between" class="h-full">
          <div>
            <s-svg
              name="icon-applogo"
              class="w-10 h-10 mx-auto my-2"
            ></s-svg>
            <n-menu
              v-model:value="activeMenu"
              :collapsed="collapsed"
              :collapsed-width="64"
              :collapsed-icon-size="32"
              :options="menuOptions"
              :render-label="renderMenuLabel"
              :expand-icon="expandIcon"
              @update:value="onUpdateMenu"
            />
          </div>
          <!-- <button class="w-full" @click="router.push('/order')">
            <s-svg name="icon-lock" class="w-10 h-10 mx-auto my-2">Us</s-svg>
          </button> -->
        </n-space>
      </n-layout-sider>
      <n-layout>
        <main class="min-h-[100vh-5rem] overflow-hidden">
          <navbar
            :name="auth.user?.detail.name"
            @logout="handleLogout"
          >
          </navbar>
          <div class="relative">
            <router-view />
          </div>
        </main>
      </n-layout>
    </n-layout>
  </n-space>
</template>

<style lang="postcss">
.n-menu .n-menu-item-content::before {
  @apply !left-0 !right-0;
}
.n-menu .n-menu-item-content.n-menu-item-content--selected::before {
  @apply !left-3 !right-3 !top-2 !bottom-2;
}
.n-menu.n-menu--collapsed
  .n-menu-item-content.n-menu-item-content--selected::before {
  @apply !bg-[#D6DBFF] border border-[#BDBFD8];
}
.n-menu .n-menu-item {
  height: 3.5rem !important;
}
div .n-layout-toggle-button{
  @apply relative right-[10px] top-[1px]
}
</style>
