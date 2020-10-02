<template>
  <div class="w-full h-vh">
    <div class="flex justify-between items-center w-full mb-4">
      <div class="flex items-center">
        <input type="color" id="color" name="color" v-model.lazy="color" />
        <label for="color" class="mx-1">color of fish</label>
      </div>
      <button
        class="bg-orange-600 text-white rounded py-2 px-4 mx-4"
        @click="toggleSmooth"
      >
        {{ smooth ? 'make jagged' : 'make smooth' }} lines
      </button>
    </div>
    <canvas id="fish" resize class="w-full bg-blue-100"></canvas>
  </div>
</template>

<script>
export default {
  data() {
    return {
      paths: null,
      color: '#000000',
      smooth: false,
      eye: null
    }
  },
  mounted() {
    const fish = document.getElementById('fish')
    this.$paper.setup(fish)
    this.paths = [new this.$paper.Path()]

    this.paths[0].strokeColor = this.color
    const startBody = new this.$paper.Point(this.$paper.view.center)
    this.paths[0].moveTo(startBody)
    this.paths[0].lineTo(startBody.add([-100, -50]))
    this.paths[0].lineTo(startBody.add([-300, -50]))
    this.paths[0].lineTo(startBody.add([-300, 0]))
    this.paths[0].lineTo(startBody.add([-350, -50]))
    this.paths[0].lineTo(startBody.add([-350, 50]))
    this.paths[0].lineTo(startBody.add([-300, 0]))
    this.paths[0].lineTo(startBody.add([-300, 50]))
    this.paths[0].lineTo(startBody.add([-100, 50]))
    this.paths[0].lineTo(startBody)
    this.paths[0].closed = true

    this.paths.push(new this.$paper.Path())
    this.paths[1].strokeColor = this.color
    this.paths[1].moveTo(startBody.add([-150, -50]))
    this.paths[1].lineTo(startBody.add([-175, -70]))
    this.paths[1].lineTo(startBody.add([-250, -70]))
    this.paths[1].lineTo(startBody.add([-225, -50]))
    this.paths[1].closed = true

    this.paths.push(new this.$paper.Path())
    this.paths[2].strokeColor = this.color
    this.paths[2].moveTo(startBody.add([-150, 50]))
    this.paths[2].lineTo(startBody.add([-175, 70]))
    this.paths[2].lineTo(startBody.add([-250, 70]))
    this.paths[2].lineTo(startBody.add([-225, 50]))
    this.paths[2].closed = true

    this.eye = new this.$paper.Path.Circle({
      center: [this.$paper.view.center.x - 100, this.$paper.view.center.y - 25],
      radius: 10,
      fillColor: this.color
    })
    this.bubbles()
    this.$paper.view.draw()
  },
  methods: {
    changeColor(value) {
      this.paths.map((item) => {
        item.strokeColor = value
      })
      this.eye.fillColor = value
    },
    toggleSmooth() {
      this.smooth = !this.smooth
      if (!this.smooth) {
        this.paths.map((item) => {
          item.flatten(100)
        })
        return
      }
      this.paths.map((item) => {
        item.smooth({ type: 'catmull-rom', factor: 0.5 })
      })
    },
    logColor(e) {
      console.log(e.target.value)
    },
    bubbles() {
      const count = 150
      const path = new this.$paper.Path.Circle({
        center: [0, 0],
        radius: 10,
        fillColor: '#0dbbff'
      })
      const symbol = new this.$paper.Symbol(path)
      const bubbleGroup = new this.$paper.Group()
      for (var i = 0; i < count; i++) {
        // The center position is a random point in the view:
        const rand = this.$paper.Point.random()

        const placement = rand.multiply(this.$paper.view.size)
        var placedSymbol = symbol.place(placement)
        placedSymbol.scale(i / count)
        bubbleGroup.addChild(placedSymbol)
      }

      console.log({ bubbleGroup })

      console.log(this.$paper.view.size.height)

      this.$paper.view.onFrame = () => {
        for (var i = 0; i < count; i++) {
          var item = bubbleGroup.children[i]

          // Move the item 1/20th of its width to the right. This way
          // larger circles move faster than smaller circles:
          item.position.y -= item.bounds.width / 20

          // If the item has left the view on the right, move it back
          // to the left:

          if (item.position.y < 0) {
            item.position.y = this.$paper.view.size.height
          }
        }
      }
    }
  },
  watch: {
    color(value) {
      this.changeColor(value)
    }
  }
}
</script>
