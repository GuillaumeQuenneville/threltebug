<script lang="ts">
  import { Canvas, T, useDisposal } from "@threlte/core";
  import { onDestroy } from "svelte";

  // tiny geometry to mirror your earlier example
  const vertices = new Float32Array([
    -1.0,
    -1.0,
    1.0, // v0
    1.0,
    -1.0,
    1.0, // v1
    1.0,
    1.0,
    1.0, // v2
    -1.0,
    1.0,
    1.0, // v3
  ]);

  const indices = new Uint16Array([0, 1, 2, 2, 3, 0]);

  const dispContext = useDisposal();
  console.log(dispContext.disposableObjects);

  console.log("[Widget] mounted");
  onDestroy(() => {
    console.log("[Widget] onDestroy");
  });
</script>

<T.AmbientLight intensity={1.0} />
<T.Mesh>
  <T.BufferGeometry>
    <T.BufferAttribute attach="attributes.position" args={[vertices, 3]} />
    <T.BufferAttribute attach="index" args={[indices, 1]} />
  </T.BufferGeometry>
  <T.MeshBasicMaterial color="red" />
</T.Mesh>
