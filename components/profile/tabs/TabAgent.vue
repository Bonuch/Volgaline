<template>
    <div class="tab-personal profile-tabs-content">
        <AgentsForm :form-schema="content">
            <template v-slot:button>
                <button type="submit" class="button text-xl bg-blue-300 mob:text-lg">Сохранить изменения</button>
            </template>
        </AgentsForm>
    </div>
</template>

<script>
import AgentsForm from "@/components/profile/AgentsForm";

export default {
    name: "TabAgent",
    components: { AgentsForm },
    props: {
        content: {
            type: Object,
            required: true,
        },
    }
};
</script>

<style lang="scss" scoped></style>
