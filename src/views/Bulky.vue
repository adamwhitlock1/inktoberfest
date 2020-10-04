<template>
  <div>
    <div id="bulky"></div>
    <div class="flex items-center justify-start">
      <button
        class="px-4 py-2 m-2 text-white bg-green-700 rounded"
        @click="addBox"
      >
        Add Extra Box
      </button>
      <button
        v-if="this.added.length > 0"
        class="px-4 py-2 m-2 text-white bg-green-700 rounded"
        @click="removeBox"
      >
        Remove Extra Box
      </button>
      <p class="mr-2">extra boxes: {{ added.length }}</p>
    </div>
  </div>
</template>

<script>
import p5 from 'p5'
export default {
  data() {
    return {
      bulky: null,
      added: [{ x: 100, y: 10000, z: 50 }]
    }
  },
  mounted() {
    const sketch = (s) => {
      s.setup = () => {
        let bulky = s.createCanvas(500, 500, s.WEBGL)
        bulky.parent('bulky')
      }

      s.draw = () => {
        s.background(0)
        s.noStroke()
        s.frameRate(30)
        s.fill(50, 150, 50, 50)
        s.rotateX(s.frameCount * 0.01)
        s.rotateY(s.frameCount * 0.01)
        s.box(200, 200, 200)

        if (this.added.length > 0) {
          this.added.map((item) => {
            s.box(item.x, item.y, item.z)
            s.rotateX(s.frameCount * -0.01)
            s.rotateY(s.frameCount * -0.01)
          })
        }
      }
    }
    this.bulky = new p5(sketch)
  },
  methods: {
    addBox() {
      this.added.push({
        x: this.randInt(200),
        y: this.randInt(10000),
        z: this.randInt(200)
      })
    },
    removeBox() {
      if (this.added.length > 0) {
        this.added.pop()
      }
    },
    randInt(max) {
      return Math.floor(Math.random() * Math.floor(max))
    }
  }
}
</script>

<style lang="scss" scoped></style>
