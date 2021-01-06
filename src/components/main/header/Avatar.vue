<template>
  <div class="avatar">
    <a-dropdown placement="bottomCenter" :getPopupContainer="(el) => el.parentNode">
      <div class="avatar-con">
        <a-avatar>
          <template v-slot:icon>
            <user-outlined></user-outlined>
          </template>
        </a-avatar>
        <o-icon class="icon" type="iconarrow-down-filling"></o-icon>
      </div>
      <template v-slot:overlay>
        <div class="card">
          <p @click="handleLogOut">退出登录</p>
        </div>
      </template>
    </a-dropdown>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { UserOutlined } from '@ant-design/icons-vue'
  import { Avatar, Dropdown } from 'ant-design-vue'
  import { useRouter, Router } from 'vue-router'
  import { removeToken, removeUsername } from '@/common/auth'
  import { REMOVE_USER_INFO } from '@/store/modules/user'
  import store from '@/store'

  export default defineComponent({
    name: 'Avatar',
    components: {
      UserOutlined,
      [Dropdown.name]: Dropdown,
      [Avatar.name]: Avatar
    },
    setup () {
      const router: Router = useRouter()

      function handleLogOut (): void {
        removeUsername()
        removeToken()
        store.commit(REMOVE_USER_INFO)
        router.push({ name: 'login' })
      }

      return {
        handleLogOut
      }
    }
  })
</script>

<style scoped lang="scss">
  .avatar {
    height: 100%;
    user-select: none;
    white-space: nowrap;

    .avatar-con {
      height: 100%;
      display: flex;
      align-items: center;

      .icon {
        font-size: 12px;
        color: $icon;
        margin-left: 4px;
      }
    }

    .card {
      width: 100px;
      padding: 5px 0;
      border-radius: 4px;
      box-shadow: $box-shadow;
      background: $white;

      p {
        height: 30px;
        line-height: 30px;
        font-size: 12px;
        text-align: center;
        color: $text-secondary;
        user-select: none;

        &:hover {
          background: $background;
        }
      }
    }
  }
</style>
