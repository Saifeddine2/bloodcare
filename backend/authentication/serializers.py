
# from rest_framework import serializers
# from .models import User

# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = ['id',  'email', 'password', 'user_type','name'] 
#         extra_kwargs = {
#             'password': {'write_only': True}, 
#         }
        
#     def create(self, validated_data):
#         password = validated_data.pop("password")
#         user_type = validated_data.pop("user_type")  
#         instance = self.Meta.model(**validated_data)
#         if password is not None:
#             instance.set_password(password)
#         instance.user_type = user_type  
#         instance.save()
#         return instance




from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'password', 'user_type', 'name', 'blood_type', 'phone_number', 'city']
        extra_kwargs = {
            'password': {'write_only': True},  # Ne pas retourner le mot de passe en réponse
        }
    
    def validate(self, data):
        # Si le user_type est "citizen", vérifier que blood_type est fourni
        if data.get('user_type') == 'citizen' and not data.get('blood_type'):
            raise serializers.ValidationError(
                {"blood_type": "Le groupe sanguin est requis pour les utilisateurs de type 'citizen'."}
            )
        return data

    def create(self, validated_data):
        password = validated_data.pop("password")
        instance = self.Meta.model(**validated_data)
        
        if password:
            instance.set_password(password)  # Hashage du mot de passe
        instance.save()  # Enregistrer l'instance utilisateur
        
        return instance
