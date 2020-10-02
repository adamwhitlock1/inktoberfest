<template>
  <div class="h-screen flex overflow-hidden bg-gray-100">
    <!-- Static sidebar for desktop -->
    <div class="hidden md:flex md:flex-shrink-0">
      <div class="flex flex-col w-64">
        <!-- Sidebar component, swap this element with another sidebar if you like -->
        <div class="flex flex-col h-0 flex-1 border-r border-gray-200 bg-white">
          <div class="flex-1 flex flex-col pb-1 overflow-y-auto">
            <div class="flex items-center w-full mx-auto bg-black py-1">
              <router-link
                to="/"
                class="font-black text-2xl text-orange-500 text-center w-full"
              >
                <h2>
                  Inktober 2020
                </h2>
              </router-link>
            </div>
            <nav class="mt-2 flex-1 px-2 bg-white space-y-1">
              <router-link
                v-for="route in routes"
                :to="route.path"
                class="group flex items-center px-2 py-1 text-sm leading-5 font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition ease-in-out duration-150"
                :key="route.name"
              >
                {{ route.name }}
              </router-link>
            </nav>
          </div>
          <div class="flex-shrink-0 flex border-t border-gray-200 p-4">
            <a
              href="https://codestuff.io/about"
              class="flex-shrink-0 w-full group block"
              target="_blank"
            >
              <div class="flex items-center">
                <div>
                  <img
                    class="inline-block h-9 w-9 rounded-full"
                    src="./assets/profile.jpg"
                    alt=""
                  />
                </div>
                <div class="ml-3">
                  <p
                    class="text-sm leading-5 font-medium text-gray-700 group-hover:text-gray-900"
                  >
                    Made By Adam
                  </p>
                  <p
                    class="text-xs leading-4 font-medium text-gray-500 group-hover:text-gray-700 transition ease-in-out duration-150"
                  >
                    Learn about me
                  </p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-col w-0 flex-1 overflow-hidden">
      <main
        class="flex-1 relative z-0 overflow-y-auto focus:outline-none"
        tabindex="0"
      >
        <div class="pt-2 pb-6 md:py-6">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <h1 class="text-2xl font-semibold text-gray-900">
              {{ $route.name }}
            </h1>
          </div>
          <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <!-- Replace with your content -->
            <div class="py-4">
              <router-view />
            </div>
            <!-- /End replace -->
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { routes } from '@/router/index'
export default {
  data() {
    return { routes }
  }
}
</script>

<style></style>
