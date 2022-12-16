<script setup lang="ts">
import { Icon } from '@vicons/utils'
import { Mail, BrandGithub } from '@vicons/tabler'
</script>

<template>
  <div flex="~ col" justify-center absolute w-full bottom-0>
    <div flex="~ row" justify-center>
      <n-button quaternary>
        <a href="mailto:hi@nicecorn.com" text-black>
          <Icon size="24">
            <Mail />
          </Icon>
        </a>
      </n-button>

      <n-button quaternary>
        <a
          href="https://github.com/GeniusCorn/datagram"
          text-black
          target="_blank"
        >
          <Icon size="24">
            <BrandGithub />
          </Icon>
        </a>
      </n-button>
    </div>

    <div text-center>
      Powered by
      <n-button text>
        <a href="https://github.com/GeniusCorn" target="_blank">GeniusCorn</a>
      </n-button>
    </div>
  </div>
</template>

<style scoped></style>
