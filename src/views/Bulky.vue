<template>
  <div>
    <p>Bulky coming soon..</p>
    <div id="bulky"></div>
  </div>
</template>

<script>
import p5 from 'p5'
export default {
  data() {
    return {
      bulky: null
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
        s.frameRate(15)
        s.fill(50, 150, 50, 50)
        s.rotateX(s.frameCount * 0.01)
        s.rotateY(s.frameCount * 0.01)
        s.box(200, 200, 100)
        s.box(100, 200, 200)
        s.rotateX(s.frameCount * -0.01)
        s.rotateY(s.frameCount * -0.01)
        s.box(100, 10000, 50)
        s.rotateX(s.frameCount * -0.01)
        s.rotateY(s.frameCount * -0.01)
        s.box(10000, 100, 50)
        s.fill(s.random(255), s.random(255), s.random(255))
      }
    }
    this.bulky = new p5(sketch)
  }
}
</script>

<style lang="scss" scoped></style>
