/**
 * component参数说明：
 * 写法1、React Element；（非懒加载，不推荐）
 * 写法2、Function: () => import(path/to/component)；（懒加载）
 */

import Home from '@/view/home';

const routes = [
    {
        link: '/app/index',
        title: '首页',
        component: Home
    },
    {
        link: '/app/intro',
        title: '介绍主页',
        // TODO: 后续可重定向
        component: () => import('@/view/intro'),
        sub: [
            {
                link: '/app/intro/company',
                title: '公司介绍',
                component: () => import('@/view/intro/company')
            },
            {
                link: '/app/intro/bu',
                title: '业务介绍',
                component: () => import('@/view/intro/bu')
            }
        ]
    }
];

export default routes;
