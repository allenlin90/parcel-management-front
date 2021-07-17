<template>
    <transition>
        <div
            id="context_menu"
            @contextmenu.capture.prevent
            ref="contextMenu"
            v-click-outside="closeMenu"
            v-show="isMenuOpened"
        >
            <div class="item"><i class="fas fa-cut"></i> <span>Cut</span></div>
            <div class="item">
                <i class="fa fa-clone"></i> <span>Copy</span>
            </div>
            <div class="item">
                <i class="fa fa-paste"></i> <span>Paste</span>
            </div>
            <div class="item">
                <i class="fas fa-trash"></i> <span>Delete</span>
            </div>
            <hr />
            <div class="selector">
                <label for="select_group">Select Group</label>
                <select id="select_group">
                    <option v-for="item in list" :key="item" :value="item">
                        {{ item }}
                    </option>
                </select>
            </div>
            <div class="item">
                <i class="fas fa-sync-alt"></i><span>Refresh</span>
            </div>
            <div class="item">
                <i class="fas fa-times"></i><span>Exit</span>
            </div>
        </div>
    </transition>
</template>

<script>
import ClickOutside from "../assets/vue-click-outside.js";
import Popper from "popper.js";
export default {
    props: {
        list: {
            type: Array,
            default() {
                return [1, 2];
            },
            required: false,
        },
    },
    data() {
        return {
            isMenuOpened: false,
            popper: null,
        };
    },
    directives: {
        ClickOutside,
    },
    methods: {
        openMenu(event, container = null) {
            this.isMenuOpened = true;
            const contextMenu = this.$refs.contextMenu;
            if (this.popper) {
                this.popper.destroy();
            }
            this.popper = new Popper(this.referenceObject(event), contextMenu, {
                placement: "right-start",
                modifiers: {
                    preventOverflow: {
                        boundariesElement: container,
                    },
                },
            });
            // Recalculate position
            this.$nextTick(() => {
                this.popper.scheduleUpdate();
            });
            // const top =
            //     event.y + contextMenu.offsetHeight > window.innerHeight
            //         ? window.innerHeight - contextMenu.offsetHeight
            //         : event.y;
            // contextMenu.style.top = top + "px";
            // const left =
            //     event.x + contextMenu.offsetWidth > window.innerWidth
            //         ? window.innerWidth - contextMenu.offsetWidth
            //         : event.x;
            // contextMenu.style.left = left + "px";
        },
        closeMenu() {
            this.isMenuOpened = false;
        },
        referenceObject(event = null) {
            if (event) {
                const left = event.clientX;
                const top = event.clientY;
                const right = left + 1;
                const bottom = top + 1;
                const clientWidth = 1;
                const clientHeight = 1;
                const obj = {
                    getBoundingClientRect() {
                        return {
                            left,
                            top,
                            right,
                            bottom,
                        };
                    },
                    clientWidth,
                    clientHeight,
                };
                return obj;
            } else {
                console.warn(`event object isn't given to referenceObject!`);
            }
        },
        beforeUnmount() {
            if (this.popper) {
                try {
                    this.popper.destroy();
                    this.popper = null;
                } catch (err) {
                    console.log("closing context menu");
                    console.warn(err);
                }
            }
        },
    },
};
</script>

<style scoped lang="scss">
$menu-background-color: #555;
$menu-text-color: #fff;
#context_menu {
    position: fixed;
    z-index: 10000;
    min-width: 180px;
    width: max-content;
    color: $menu-text-color;
    background-color: $menu-background-color;
    font-size: 1.2rem;
    border-radius: 5px;
    .item {
        padding: 0.3rem 1rem;
        cursor: pointer;
        transition: all 0.2s ease;
        &:first-child {
            border-radius: 5px 5px 0 0;
        }
        &:last-child {
            border-radius: 0 0 5px 5px;
        }
        span {
            display: inline-block;
            margin-left: 10px;
        }
    }
    .item:hover {
        color: invert($menu-text-color);
        background-color: invert($menu-background-color);
    }
    .selector {
        display: flex;
        flex-direction: column;
        padding: 0.3rem 1rem;
    }
    hr {
        margin: 0;
    }
}
.v-enter-active {
    animation: fadeIn 0.1s ease;
}
.v-leave-active {
    animation: fadeIn 0.1s ease reverse;
}
@keyframes fadeIn {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}
</style>