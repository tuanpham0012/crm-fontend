<template>
    <div class="main-panel">
        <div class="content-wrapper">
            <div class="page-header">
                <h3 class="page-title">Phòng ban</h3>
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item">
                            <a href="#">Quản lí</a>
                        </li>
                        <li class="breadcrumb-item active" aria-current="page">Phòng ban</li>
                    </ol>
                </nav>
            </div>
            <div class="row">
                <div class="col-12 grid-margin stretch-card">
                    <div class="card">
                        <div class="card-body">
                            <h4 class="card-title">Danh sách phòng ban</h4>
                            <div class="btn-add">
                                <button type="button" @click="showModal = !showModal" class="btn btn-gradient-info btn-icon-text"><i class="mdi mdi-plus-circle btn-icon-prepend"></i> Tạo mới
                                </button>
                            </div>
                            <div class="departments">
                                <div class="department">
                                    <div class="title">
                                        <h4 class="name">abcabc</h4>
                                        <div class="detail">
                                            <span>Trưởng phòng:</span><span> Abcd </span>
                                        </div>
                                    </div>
                                    <p> > </p>
                                </div>
                                <div class="department">
                                    <div class="title">
                                        <h4 class="name">abcabc</h4>
                                        <div class="detail">
                                            <span>Trưởng phòng:</span><span> Abcd </span>
                                        </div>
                                    </div>
                                    <p> > </p>
                                </div>
                                <div class="department">
                                    <div class="title">
                                        <h4 class="name">abcabc</h4>
                                        <div class="detail">
                                            <span>Trưởng phòng:</span><span> Abcd </span>
                                        </div>
                                    </div>
                                    <p><i class="mdi mdi-chevron-double-right"></i> </p>
                                </div>
                            </div>
                            <div class="row mt-3">
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {};
</script>
<style scoped>

p{
    margin: 0;
}

.btn-add{
    position: absolute;
    top: 1.5rem;
    right: 1rem;
}
.departments{
    margin: 2rem 0.5rem;
    padding: 1rem 0.5rem;
}
.department{
    display: flex;
    margin: 0 auto;
    justify-content: space-between;
    align-items: center;
    align-content: center;
    width: 90%;
    margin-top: 1rem;
    padding: 0.65rem 2rem;
    border-radius: 0.5rem;
    box-shadow: 2px 2px 3px 3px rgb(194, 193, 193);
    cursor: pointer;
}

.department i{
    font-size: 1.5rem;
}

.department:hover{
    background-color: rgb(244, 244, 252);
    color: rgb(0, 16, 85);
}
</style>
