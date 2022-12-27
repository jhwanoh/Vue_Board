<template>
  <nav class="navbar navbar-expand-sm bg-light">
    <div class="container-fluid">
      <a class="navbar-brand">게시판</a>

      <div class="navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <RouterLink class="nav-link" active-class="active" to="/board">
              메인
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" active-class="active" to="/board/add">
              등록
            </RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script></script>
