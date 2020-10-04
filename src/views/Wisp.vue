<template>
  <div>
    <canvas id="wisp" resize class="bg-gray-200 w-full"></canvas>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: 'hey',
      name: 'Effie',
      age: 9
    }
  },
  mounted() {
    const wisp = document.getElementById('wisp')
    this.$paper.setup(wisp)
    let path
    this.$paper.view.onMouseDown = (event) => {
      path = new this.$paper.Path()
      path.add(event.point)
      path.strokeColor = 'red'
    }

    this.$paper.view.onMouseDrag = (event) => {
      path.add(event.point)
    }

    this.$paper.view.onMouseUp = () => {
      this.processPath(path)
    }
  },
  methods: {
    processPath(path) {
      console.log({ path })
      var values = {
        scale: 0.5,
        smooth: 0.5,
        maxrep: 25,
        minlength: 10,
        autorotate: true,
        rotate: -90
      }

      // get frequently used params
      var scale = values.scale
      // HACK: transform can be upset by scale = 1 and angle = 90, 45 etc
      if (scale === 1) {
        scale = 0.9999
      }
      var autorotate = values.autorotate
      var rotate = values.rotate
      var minlength = values.minlength
      var maxrep = values.maxrep

      // smooth the hand drawn curve
      path.smooth({ type: 'catmull-rom', factor: values.smooth })

      var nextseg = path.clone()
      console.log({ nextseg })
      for (var i = 0; i < maxrep; i++) {
        var lastCurve = path.lastCurve
        console.log({ lastCurve })
        var point2 = lastCurve.point2
        var angle2 = lastCurve.getTangentAt(1).angle
        console.log({ angle2 })

        nextseg.scale(scale)

        var firstB = nextseg.curves[0]
        var point1 = firstB.point2
        console.log({ firstB: firstB.getTangentAt(1) })
        var angle1 = firstB.getTangentAt(1).getAngle()

        var angle
        if (autorotate) {
          angle = angle2 - angle1
        } else {
          angle = rotate
        }

        nextseg.rotate(angle, point1)

        nextseg.position += point2 - point1

        if (nextseg.length < minlength) {
          break
        } else {
          path.join(nextseg.clone())
        }
      } // loop repetitions

      nextseg.remove() // remove the working segment
    }
  }
}
</script>

<style lang="scss" scoped></style>
