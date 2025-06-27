let SessionLoad = 1
let s:so_save = &g:so | let s:siso_save = &g:siso | setg so=0 siso=0 | setl so=-1 siso=-1
let v:this_session=expand("<sfile>:p")
silent only
silent tabonly
cd ~/code/csit-ams
if expand('%') == '' && !&modified && line('$') <= 1 && getline(1) == ''
  let s:wipebuf = bufnr('%')
endif
let s:shortmess_save = &shortmess
if &shortmess =~ 'A'
  set shortmess=aoOA
else
  set shortmess=aoO
endif
badd +10 ~/code/csit-ams/src/app/(auth)/sign-in/page.tsx
badd +4 ~/code/csit-ams/src/app/(auth)/sign-up/page.tsx
badd +44 ~/code/csit-ams/src/app/(auth)/sign-in/form.tsx
argglobal
%argdel
edit ~/code/csit-ams/src/app/(auth)/sign-in/form.tsx
let s:save_splitbelow = &splitbelow
let s:save_splitright = &splitright
set splitbelow splitright
wincmd _ | wincmd |
vsplit
wincmd _ | wincmd |
vsplit
2wincmd h
wincmd w
wincmd w
let &splitbelow = s:save_splitbelow
let &splitright = s:save_splitright
wincmd t
let s:save_winminheight = &winminheight
let s:save_winminwidth = &winminwidth
set winminheight=0
set winheight=1
set winminwidth=0
set winwidth=1
exe 'vert 1resize ' . ((&columns * 30 + 135) / 270)
exe 'vert 2resize ' . ((&columns * 119 + 135) / 270)
exe 'vert 3resize ' . ((&columns * 119 + 135) / 270)
argglobal
enew
file neo-tree\ filesystem\ \[1]
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=99
setlocal fml=1
setlocal fdn=20
setlocal fen
wincmd w
argglobal
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=99
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
1,4fold
6,8fold
14,16fold
12,17fold
19,22fold
27,28fold
26,31fold
24,32fold
23,34fold
35,37fold
39,41fold
38,42fold
43,45fold
18,46fold
49,51fold
47,52fold
11,53fold
10,54fold
6,54fold
let &fdl = &fdl
let s:l = 44 - ((40 * winheight(0) + 30) / 61)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 44
normal! 0
wincmd w
argglobal
if bufexists(fnamemodify("~/code/csit-ams/src/app/(auth)/sign-in/page.tsx", ":p")) | buffer ~/code/csit-ams/src/app/(auth)/sign-in/page.tsx | else | edit ~/code/csit-ams/src/app/(auth)/sign-in/page.tsx | endif
if &buftype ==# 'terminal'
  silent file ~/code/csit-ams/src/app/(auth)/sign-in/page.tsx
endif
balt ~/code/csit-ams/src/app/(auth)/sign-up/page.tsx
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=99
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
9,11fold
13,15fold
12,16fold
8,17fold
20,22fold
18,24fold
7,25fold
6,26fold
5,26fold
let &fdl = &fdl
let s:l = 10 - ((9 * winheight(0) + 30) / 61)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 10
normal! 022|
wincmd w
exe 'vert 1resize ' . ((&columns * 30 + 135) / 270)
exe 'vert 2resize ' . ((&columns * 119 + 135) / 270)
exe 'vert 3resize ' . ((&columns * 119 + 135) / 270)
tabnext 1
if exists('s:wipebuf') && len(win_findbuf(s:wipebuf)) == 0 && getbufvar(s:wipebuf, '&buftype') isnot# 'terminal'
  silent exe 'bwipe ' . s:wipebuf
endif
unlet! s:wipebuf
set winheight=1 winwidth=20
let &shortmess = s:shortmess_save
let &winminheight = s:save_winminheight
let &winminwidth = s:save_winminwidth
let s:sx = expand("<sfile>:p:r")."x.vim"
if filereadable(s:sx)
  exe "source " . fnameescape(s:sx)
endif
let &g:so = s:so_save | let &g:siso = s:siso_save
doautoall SessionLoadPost
unlet SessionLoad
" vim: set ft=vim :
