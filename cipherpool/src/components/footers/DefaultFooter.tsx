import { A } from "@solidjs/router";

function DefaultFooter() {
    return <footer class="w-full bg-night-700 py-1 px-8">
        <ul class="bar-list flex p-0 m-0 list-none">
            <li class="mr-2"><A href="/tutorial">Tutorial</A></li>
            <li class="mr-2"><A href="/help">Help</A> </li>
            <li class="mr-2"><A href="/AboutUs">About Us</A></li>
            <li class="mr-2"><A href="/License">License</A></li>
        </ul>
    </footer>
}

export default DefaultFooter;