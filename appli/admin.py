import django.contrib.admin as admin

# Register your models here, pour les gérer avec interface admin.
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.forms import UserCreationForm, UserChangeForm
import rest_framework_simplejwt.token_blacklist as token_blacklist

from appli.models import Mouvements, Articles, Effectifs, Inventaires, User


class CustomUserCreationForm(UserCreationForm):
    class Meta:
        model = User
        fields = (
            'email',
            'username',
        )


class CustomUserChangeForm(UserChangeForm):
    class Meta:
        model = User
        fields = (
            'email',
            'username',
        )


class CustomUserAdmin(UserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = User
    list_display = (
        'email',
        'username',
        'is_staff',
        'is_active',
    )
    list_filter = (
        'email',
        'username',
        'is_staff',
        'is_active',
    )
    fieldsets = (
        (
            None,
            {
                'fields': (
                    'email',
                    'username',
                    'password',
                    'bio',
                    'full_name',
                    'birth_date',
                )
            },
        ),
        (
            'Permissions',
            {
                'fields': (
                    'is_staff',
                    'is_active',
                )
            },
        ),
    )
    add_fieldsets = (
        (
            None,
            {'classes': ('wide',), 'fields': ('email', 'username', 'password1', 'password2', 'is_staff', 'is_active')},
        ),
    )
    search_fields = (
        'email',
        'username',
    )
    ordering = (
        'email',
        'username',
    )


class OutstandingTokenAdmin(token_blacklist.admin.OutstandingTokenAdmin):
    def has_delete_permission(self, *args, **kwargs):
        return True  # or whatever logic you want


admin.site.unregister(token_blacklist.models.OutstandingToken)
admin.site.register(token_blacklist.models.OutstandingToken, OutstandingTokenAdmin)

admin.site.register(User, CustomUserAdmin)

admin.site.register(Mouvements)
admin.site.register(Articles)
admin.site.register(Effectifs)
admin.site.register(Inventaires)
