<script lang="ts">
    import {
        Container,
        Row,
        Col,
    } from 'sveltestrap';
    import BankDropdown from '../utils/BankDropdown.svelte';
    import DragDropList from 'svelte-dragdroplist';
    import Nav from '../components/Nav.svelte';
    import { assessmentOutcomes } from '../stores/instructor';
    let ddList = $assessmentOutcomes.map((o)=>{
        return {'text': o.title,'outcome': o}
    })
    $: $assessmentOutcomes = ddList.map((l)=>l.outcome)
</script>

<Nav/>

<main>
    <Container>
        <h1 class="display-4">☑️It Assessment Builder</h1>
        <Row>
            <Col sm="4">
                <p>
                    Build your assessment by first adding learning outcomes 
                    from exercise banks:
                </p>
                <p><BankDropdown/></p>
                <p>
                    Then you can sort these outcomes into whatever order 
                    you wish. 
                </p>
            </Col>
            <Col sm="8">
                <div class="outcome-ordering">
                    <DragDropList bind:data={ddList} removesItems/>
                </div>
            </Col>
        </Row>
    </Container>
</main>

<style>
    h1 { margin-top:0.5em }
    .outcome-ordering { border: 1px #888 solid; border-radius: 5px; padding: 10px;}
</style>