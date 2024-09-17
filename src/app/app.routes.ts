import { Routes } from '@angular/router';
import { PostComponent } from './components/post/post.component';
import { PostsComponent } from './components/posts/posts.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';

export const routes: Routes = [
    {
        path:'',
        pathMatch:'full',
        redirectTo:'posts'
    },
    {
        path:'posts',
        component:PostsComponent,
    },
    {
        path:'details/:id',
        component:PostDetailComponent,
    }
];
