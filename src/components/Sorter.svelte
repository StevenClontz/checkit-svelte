<script lang="ts">
    import DragDropList from 'svelte-dragdroplist';

    export let array:Array<any>;

    export let removesItems = true;
    export let display = (element:any) => element;

    let ddArray = array.map((item)=>{
        return {
            'text': display(item),
            'item': item,
        }
    });
    $: array = ddArray.map((i)=>i.item);
</script>

<DragDropList bind:data={ddArray} {removesItems}/>