/* @refresh reload */
import { render } from 'solid-js/web'
import { Router } from "@solidjs/router";
import { lazy } from "solid-js";
import './index.css'

const routes = [
    {
        path: "/",
        component: lazy(() => import("./pages/home/Home")),
    },
    {
        path: "/arena",
        component: lazy(() => import("./pages/game/single_player/Arena")),
    },
    {
        path: "/dashboard",
        component: lazy(() => import("./pages/user/Dashboard")),
    },
    {
        path: "/setting",
        component: lazy(() => import("./pages/setting/Setting")),
    },
]
const root = document.getElementById('root')

render(() => <Router>{routes}</Router>, root!)
